"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../InputField";
import Image from "next/image";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchema";
import { useFormState } from "react-dom";
import { createTeacher, updateTeacher } from "@/lib/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { s } from "framer-motion/client";

const TeacherForm = ({
  type,
  data,
  setOpen,
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
    setValue,
    formState: { errors },
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  });
  const [state, formAction] = useFormState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  );
  const [previewImage, setPreviewImage] = useState<string | null>(
    data?.image || null
  );
  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      const imageUrl = result.filePath;

      // Set the image URL in the form data and update the preview
      setValue("img", imageUrl);
      setPreviewImage(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image");
    }
  };
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { subjects } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {" "}
        {type === "create" ? "Create a new Teacher" : "Update a new Teacher"}
      </h1>
      <span className="text-cs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />

        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-cs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        {" "}
        <InputField
          label="First name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Last Name"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors?.surname}
        />
        <InputField
          label="phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors?.bloodType}
        />
        <InputField
          label="birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors?.birthday}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 ">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            {" "}
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex?.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 ">
          <label className="text-xs text-gray-500">Subjects</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjects")}
            defaultValue={data?.subjects}
          >
            {subjects.map((subject: { id: string; name: string }) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjects?.message && (
            <p className="text-xs text-red-400">
              {errors.subjects?.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center items-center">
          <label
            className={`relative text-xs text-gray-500 flex flex-col items-center gap-2 cursor-pointer ${
              previewImage ? "text-transparent" : ""
            }`}
            htmlFor="img"
          >
            {!previewImage && (
              <span className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                Upload a photo
              </span>
            )}
            <Image
              src={previewImage || "/upload.png"}
              alt="Uploaded Preview"
              width={100}
              height={100}
              className={`rounded-md object-cover border-2 ${
                previewImage ? "border-blue-400" : "border-gray-300"
              }`}
            />
            {previewImage && (
              <span
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setPreviewImage(null); // Remove preview image
                }}
              >
                ✕
              </span>
            )}
          </label>
          <input
            type="file"
            id="img"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
          {errors.img?.message && (
            <p className="text-xs text-red-400 mt-2">{errors.img.message}</p>
          )}
        </div>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
