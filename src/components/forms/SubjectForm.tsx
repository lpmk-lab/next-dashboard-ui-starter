"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../InputField";

import { subjectschema, Subjectschema } from "@/lib/formValidationSchema";
import { createSubject, updateSubject } from "@/lib/action";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
  setOpen,
  type,
  data,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Subjectschema>({
    resolver: zodResolver(subjectschema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { teachers } = relatedData;
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update a new subject"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
      </div>

      {data && (
        <InputField
          label="Id"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors?.id}
          hidden
        />
      )}
      <div className="flex flex-col gap-3 w-full md:w-1/4">
        <label className="text-sm font-medium text-gray-600">Teachers</label>
        <select
          multiple
          className="ring-1.5 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 rounded-md text-sm w-full bg-white shadow-sm hover:ring-gray-400 transition"
          {...register("teachers")}
          defaultValue={data?.teachers}
        >
          {teachers.map(
            (teacher: { id: string; name: string; surname: string }) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name + " " + teacher.surname}
              </option>
            )
          )}
        </select>
        {errors.teachers?.message && (
          <p className="text-sm text-red-500 mt-1">
            {errors.teachers?.message.toString()}
          </p>
        )}
      </div>

      {state.error && (
        <span className="text-red-500">Something went worng!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
