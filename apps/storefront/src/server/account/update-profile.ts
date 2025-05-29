'use server';

import { type User } from '@repo/types/user';

export async function updateProfile(_prevState: unknown, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const image = formData.get('image') as string;

  // Mock validation
  if (!name || !email) {
    return {
      data: null,
      success: false,
      message: 'Name and email are required.',
    };
  }

  if (!email.includes('@')) {
    return {
      data: null,
      success: false,
      message: 'Please enter a valid email address.',
    };
  }

  try {
    // Mock API call - simulate success
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock updated user data
    const updatedUser: User = {
      id: 'mock-user-id',
      email,
      emailVerified: true,
      name,
      image: image || '',
    };

    return {
      data: updatedUser,
      success: true,
      message: 'Profile updated successfully!',
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: 'An error occurred while updating your profile.',
    };
  }
}
