"use server";

interface UserProfileUpdate {
    name: string;
    last_name: string;
    email: string;
    gender: string;
  }
  
  interface UserProfile extends UserProfileUpdate {
    phone:string;
    phone_country_code: string;
    identity_no: string;
    passport_no: string;
  }


export async function getUserInfo(token: string | undefined): Promise<UserProfile> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/api-patients/users/infos',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );

    if (response.status === 404) {
        throw new Error('User not found');
      } else if (response.status === 500) {
        throw new Error('Internal server error');
      } else if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }

    const data = await response.json() as UserProfile;

    return data;
  } catch (error) {
    // console.error('Error fetching user information:', error);
    throw error;
  }
}

export const updateProfile = async (
  token: string | undefined,
  profileData: UserProfileUpdate
): Promise<void> => {
  try {
    // console.log(JSON.stringify(profileData));
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/api-patients/users/update',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(profileData),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update user information');
      
    }
    // Assuming the server responds with an empty JSON object on successful update
    await response.json();
  } catch (error) {
    console.error('Error updating user information:', error);
    throw error;
  }
};


  
