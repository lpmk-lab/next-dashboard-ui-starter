"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../InputField";
import { menuSchema, MenuSchema } from "@/lib/formValidationSchema";
import { useFormState } from "react-dom";
import { createMenu, updateMenu } from "@/lib/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { s } from "framer-motion/client";
import ImageUploader from "../ImageUpload";

const MenuForm = ({
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
  } = useForm<MenuSchema>({
    resolver: zodResolver(menuSchema),
  });
  const [state, formAction] = useFormState(
    type === "create" ? createMenu : updateMenu,
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
      toast(`Menu has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);
  console.log("MenuForm:" + data.icon);
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {" "}
        {type === "create" ? "Create a new Menu" : "Update a new Menu"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        {" "}
        <InputField
          label="Lable"
          name="label"
          defaultValue={data?.label}
          register={register}
          error={errors?.label}
        />{" "}
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
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Category"
          name="category"
          defaultValue={data?.category}
          register={register}
          error={errors?.category}
        />
        <InputField
          label="Href"
          name="href"
          defaultValue={data?.href}
          register={register}
          error={errors?.href}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 ">
          <label className="text-xs text-gray-500">Visible</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("visible")}
            defaultValue={data?.visible}
          >
            {" "}
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
          </select>
          {errors.visible?.message && (
            <p className="text-xs text-red-400">
              {errors.visible?.message.toString()}
            </p>
          )}
        </div>
        <ImageUploader
          onImageUpload={(imageUrl) => setValue("icon", imageUrl)}
          defaultImage={data?.icon} // Set default image if available
          error={errors.icon?.message}
          attributeName="icon"
        />
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

export default MenuForm;
