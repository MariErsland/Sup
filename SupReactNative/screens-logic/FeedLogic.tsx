import { useState, useEffect, useContext } from 'react';
import { ActivityProps } from '../components/activity';
import { LoginContext } from '../App';
import { retrieveToken } from '../security/token_handling';

export const useFeedLogic = () => {
  const { isLoggedIn } = useContext(LoginContext);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityProps[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityProps[] | null>(null);
  const [pastActivities, setPastActivities] = useState<ActivityProps[]>([]);

  const handleFetchActivities = async () => {
    setIsLoading(true);

    const myToken = await retrieveToken();
    await fetch(`http://152.94.160.72:3000/activity/activities/`, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
        const currentDate = new Date();
        const pastActivities = data.filter((activity) => new Date(activity.time) < currentDate);
        setPastActivities(pastActivities);
        setFilteredActivities(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching activity', error);
      });
  };

  const handleFilterReset = () => {
    setSelectedCategories([]);
    setSelectedCounties([]);
    setFilteredActivities(activities);
  };

  useEffect(() => {
    const getData = async () => {
      await handleFetchActivities();
    };
    getData();
  }, []);

  useEffect(() => {
    let filtered = activities;
    if (selectedCategories.length) {
      filtered = filtered.filter((activity: ActivityProps) =>
        selectedCategories.some((category: string) => activity.category === category)
      );
    }
    if (selectedCounties.length) {
      filtered = filtered.filter((activity: ActivityProps) =>
        selectedCounties.includes(activity.county)
      );
    }
    setFilteredActivities(filtered);
  }, [selectedCategories, selectedCounties, activities]);

  return {
    isLoggedIn,
    isLoading,
    activities,
    filteredActivities,
    setFilteredActivities,
    pastActivities,
    selectedCategories,
    setSelectedCategories,
    selectedCounties,
    setSelectedCounties,
    handleFetchActivities,
    handleFilterReset,
  };
};
