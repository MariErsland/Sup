import { useState, useEffect } from 'react';
import { ActivityProps } from '../components/activity';
import { retrieveToken } from '../security/token_handling';

interface UseMyActivitiesLogic {
  activities: ActivityProps[] | null;
  isLoading: boolean;
  handleMyCreatedActivities: () => Promise<void>;
}

export const useMyActivitiesLogic = (): UseMyActivitiesLogic => {
  const [activities, setActivities] = useState<ActivityProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleMyCreatedActivities = async () => {
    setIsLoading(true);
    const myToken = await retrieveToken();
    try {
      const response = await fetch('http://152.94.160.72:3000/activities-by-user', {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      });
      const data = await response.json();
      console.log('Data from server:', data);
      setActivities(data);
    } catch (error) {
      console.log('Error fetching activity', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      await handleMyCreatedActivities();
    };
    getData();
  }, []);

  return { activities, isLoading, handleMyCreatedActivities };
};
