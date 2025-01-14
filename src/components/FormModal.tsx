"use client";
import { deleteSubject } from "@/lib/action";
import { sub } from "framer-motion/client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteSubject,
  teacher: deleteSubject,
  student: deleteSubject,
  exam: deleteSubject,

  parent: deleteSubject,
  lesson: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>loading...</h1>,
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>loading...</h1>,
});

const StubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>loading...</h1>,
});
const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      // relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      // relatedData={relatedData}
    />
  ),
  subject: (setOpen, type, data, relatedData) => (
    <StubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};
interface FormModalProps {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any; // Replace with the actual data type
  id?: number | string;
  relatedData?: any;
}

const FormModal: React.FC<FormModalProps> = ({
  table,
  type,
  data,
  id,
  relatedData,
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";
  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });
    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`Subject has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    }, [state]);
    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium">
          All data will be lost.Are you sure want to delete this {table} ?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      // <TeacherForm type="create" />
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not Form"
    );
  };
  return (
    <>
      <button
        className={
          size + " flex items-center justify-center rounded-full " + bgColor
        }
        onClick={() => setOpen(true)}
      >
        <Image
          src={`/${type}.png`}
          alt={`${type} icon`}
          width={16}
          height={16}
        />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          {/* <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"></div> */}
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] ">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
