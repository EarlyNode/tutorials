import { UserProfile } from '@prisma/client';

import prisma from '@/lib/prisma';

export type PartialUserProfileParameters = Pick<
  Parameters<typeof prisma.userProfile.create>[0]['data'],
  'acceptedTermsAndConditions' | 'email' | 'id' | 'name'
>;

// CREATE

/**
 * Saves a new user profile to the database.
 *
 * @param user profile - Parameters of the user profile that should be created.
 * @returns The newly created user profile.
 */
export async function saveUserProfileToDatabase(
  userProfile: PartialUserProfileParameters,
) {
  return prisma.userProfile.create({ data: userProfile });
}

// READ

/**
 * Returns the first user profile that exists in the database with the given
 * email.
 *
 * @param email - The email of the user profile to retrieve.
 * @returns The user profile with the given email, or null if it wasn't found.
 */
export async function retrieveUserProfileFromDatabaseByEmail(
  email: UserProfile['email'],
) {
  return await prisma.userProfile.findUnique({ where: { email } });
}

// DELETE

/**
 * Removes a user profile from the database.
 *
 * @param id - The id of the user profile you want to delete.
 * @returns The user profile that was deleted.
 */
export async function deleteUserProfileFromDatabaseById(id: UserProfile['id']) {
  return prisma.userProfile.delete({ where: { id } });
}
