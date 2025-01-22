"use server";
import {
  ClassSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchema";
import prisma from "./prisma";
type currentState = { success: boolean; error: boolean };
import { v4 as uuidv4 } from "uuid";
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
    await prisma.teacher.create({
      data: {
        id: uuidv4(), // Generate a unique ID
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
      },
    });
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
  try {
    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
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
