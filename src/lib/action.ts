"use server";

import { clerkClient } from "@clerk/nextjs/server";
import {
  ClassSchema,
  loginSchema,
  MenuSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchema";
import prisma from "./prisma";
type currentState = { success: boolean; error: boolean };
import { v4 as uuidv4 } from "uuid";
import { createSession } from "./Session";
import { redirect } from "next/navigation";
export const createSubject = async (
  currentState: currentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => {
            return { id: teacherId };
          }),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: currentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => {
            return { id: teacherId };
          }),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: currentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const createClass = async (
  currentState: currentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data: {
        name: data.name,
        capacity: data.capacity,
        gradeId: data.gradeId,
        supervisorId: data.supervisorId,
      },
    });
    // revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: currentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        capacity: data.capacity,
        gradeId: data.gradeId,
        supervisorId: data.supervisorId,
      },
    });
    // revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: currentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const createTeacher = async (
  currentState: currentState,
  data: TeacherSchema
) => {
  try {
    const client = await clerkClient();

    const user = await client.users.createUser({
      username: data.name,
      firstName: data.name,
      lastName: data.surname,
      password: data.password,
      publicMetadata: { role: "teacher" },
    });
    console.log(user);
    const teacher = await prisma.teacher.create({
      data: {
        id: user.id, // Generate a unique ID
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email ?? undefined, // Handle optional fields
        phone: data.phone ?? undefined,
        address: data.address,
        img: data.img ?? undefined,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    console.log(teacher);
    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating teacher:", error);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: currentState,
  data: TeacherSchema
) => {
  const client = await clerkClient();
  try {
    if (!data.id) {
      return { success: false, error: true };
    }
    const user = await client.users.updateUser(data.id, {
      username: data.name,
      firstName: data.name,
      lastName: data.surname,
      ...(data.password !== "" && { password: data.password }),
      publicMetadata: { role: "teacher" },
    });

    const teacher = await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email ?? undefined, // Handle optional fields
        phone: data.phone ?? undefined,
        address: data.address,
        img: data.img ?? undefined,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    // revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: currentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const createMenu = async (
  currentState: currentState,
  data: MenuSchema
) => {
  try {
    await prisma.menuItem.create({
      data: {
        title: data.title,
        icon: data.icon,
        href: data.href,
        category: data.category,
        label: data.label,
        visible: {
          set: data.visible,
        },
      },
    });
    // revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const updateMenu = async (
  currentState: currentState,
  data: MenuSchema
) => {
  try {
    console.log(data);
    await prisma.menuItem.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        icon: data.icon,
        href: data.href,
        category: data.category,
        label: data.label,
        visible: {
          set: data.visible,
        },
      },
    });
    // revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const deleteMenu = async (
  currentState: currentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.menuItem.delete({
      where: {
        id: id,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
const testUser = {
  id: "1",
  email: "lapyaeminkhant.sbs@gamil.com",
  password: "123456",
  role: "admin",
};
// export const loging = async (formData: FormData) => {
//   try {
//     // Validate form data using the schema
//     const result = loginSchema.safeParse(Object.fromEntries(formData));
//     if (!result.success) {
//       // If validation fails, return the field errors
//       return {
//         success: false,
//         error: true,
//       };
//     }

//     // Extract email and password from validated data
//     const { email, password } = result.data;

//     // Check if the email and password match the test user credentials
//     if (email !== testUser.email || password !== testUser.password) {
//       return {
//         errors: {
//           email: ["Invalid email or password"],
//         },
//       };
//     }

//     // Create a session for the user
//     await createSession(testUser.id, testUser.role);
//     return {
//       success: true,
//       error: false,
//     };
//   } catch (error) {
//     // Handle unexpected errors
//     return {
//       success: false,
//       error: true,
//     };
//   }
// };
export const login = async (currentState: currentState, data: FormData) => {
  try {
    const email = data.get("email") as string;
    console.log(email);
    const password = data.get("password") as string;
    if (email !== testUser.email || password !== testUser.password) {
      return {
        success: false,
        error: true,
        message: "Invalid email or password",
      };
    }
    await createSession(testUser.id, testUser.role);
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true, message: error };
  }
};
