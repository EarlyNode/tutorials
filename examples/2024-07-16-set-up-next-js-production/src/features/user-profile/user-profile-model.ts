import prisma from '@/lib/prisma';

export async function retrieveUserProfileFromDatabaseByEmail(email: string) {
  return await prisma.userProfile.findUnique({ where: { email } });
}
