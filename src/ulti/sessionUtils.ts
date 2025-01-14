import { auth } from "@clerk/nextjs/server";
let role: string | undefined;
let CurrentUserId: string | undefined;
auth()
  .then(({ userId, sessionClaims }) => {
    role = (sessionClaims?.metadata as { role?: string })?.role;
    CurrentUserId = userId;
  })
  .catch((error) => {
    console.error("Failed to retrieve session claims:", error);
  });
const currentWorkWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Correct method to get the day of the week (0 = Sunday, 6 = Saturday)

  const startOfWeek = new Date(today);
  // Adjust to the previous Monday
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(today.getDate() + daysToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
};

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const startOfWeek = currentWorkWeek();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();
    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1; // Handle Sunday as the last day of the week
    const adjustedStartDate = new Date(startOfWeek);

    adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );

    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};

export { role, CurrentUserId };
