"use client";

import {
  Fingerprint,
  Hash,
  IdCard,
  RussianRuble,
  Text,
  Timer,
  Users,
} from "lucide-react";
import { useDispatch } from "react-redux";
import React from "react";
import { AppDispatch } from "./redux/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { createTask } from "./redux/slices/taskSlice";
import { TSubmitData } from "./types";
import toast from "react-hot-toast";

const defaultToken = "317ad1fc-e0a9-11ef-a978-0242ac120007";

function Main() {
  const settings = ["Приватный контент", "Тяжелая задача", "Автозаполнение"];
  const [settingsOpen, setSettingsOpen] = React.useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSubmitData>();
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit: SubmitHandler<TSubmitData> = async (data) => {
    const { tags, ...otherData } = data;
    const isCreated = await dispatch(
      createTask({
        tags: tags.split(","),
        private_content: null,
        is_hard: settingsOpen.includes("Тяжелая задача"),
        all_auto_responses: settingsOpen.includes("Автозаполнение"),
        ...otherData,
      })
    );
    if (!isCreated.payload) {
      toast.error("Задача не создана, возникла ошибка. Попробуйте ещё раз");
    } else {
      if (isCreated.payload.ok) {
        toast.success("Задача создана");
      } else {
        toast.error("Задача не создана, возникла ошибка. Попробуйте ещё раз");
      }
    }
  };
  return (
    <div className="flex items-center justify-center flex-col gap-y-4 min-h-screen bg-gray-100 pt-1 pb-1- font-[Inter]">
      <h1 className="text-3xl font-bold text-black">Задача</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center flex-col bg-white shadow-lg rounded-lg w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
          {/* Первая колонка */}
          <div className="flex flex-col w-full gap-y-2">
            <p className="text-xl font-bold text-black">Основное:</p>
            <div className="w-full flex flex-col gap-y-5 rounded-lg">
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="title" className="text-black font-medium">
                  Название:
                </label>
                <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md">
                  <Text color="#4b4b4b" size={20} />
                  <input
                    className="w-full text-black font-[Inter] outline-none"
                    type="text"
                    id="title"
                    {...register("title", {
                      required: "Название не указано",
                    })}
                    placeholder="Введите название"
                  />
                </div>
                <span className="text-xs text-red-500">
                  {errors.title && errors.title.message}
                </span>
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-black font-medium">Описание:</label>
                <div className="pt-2 pl-3 border border-solid border-[#dce3eb] rounded-md">
                  <textarea
                    className="flex w-full text-black font-[Inter] outline-none min-h-[70px]"
                    {...register("description", {
                      required: "Описание не указано",
                    })}
                    placeholder="Введите описание"
                  />
                </div>
                <span className="text-xs text-red-500">
                  {errors.description && errors.description.message}
                </span>
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-black font-medium">
                  Теги:{" "}
                  <span className="text-sm text-[#737373]">
                    (через запятую, без пробелов)
                  </span>
                </label>
                <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md">
                  <Hash color="#4b4b4b" size={20} />
                  <input
                    className="w-full text-black font-[Inter] outline-none"
                    {...register("tags", { required: "Теги не указано" })}
                    placeholder="Введите теги"
                  />
                </div>
                <span className="text-xs text-red-500">
                  {errors.tags && errors.tags.message}
                </span>
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-black font-medium">Бюджет:</label>
                <div className="flex gap-x-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md w-full">
                      <RussianRuble color="#4b4b4b" size={21} />
                      <input
                        min="0"
                        max="1000000"
                        className="w-full text-black font-[Inter] outline-none"
                        type="number"
                        placeholder="От"
                        {...register("budget_from", {
                          required: "Бюджет от не указан",
                        })}
                      />
                    </div>
                    <span className="text-xs text-red-500">
                      {errors.budget_from && errors.budget_from.message}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md w-full">
                      <RussianRuble color="#4b4b4b" size={21} />
                      <input
                        min="0"
                        max="1000000"
                        className="w-full text-black font-[Inter] outline-none"
                        type="number"
                        placeholder="До"
                        {...register("budget_to", {
                          required: "Бюджет до не указано",
                        })}
                      />
                    </div>
                    <span className="text-xs text-red-500">
                      {errors.budget_to && errors.budget_to.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-1 w-full">
                <label className="text-black font-medium">
                  Дедлайн <span className="text-sm text-[#737373]">(дней)</span>
                </label>
                <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md w-full">
                  <Timer color="#4b4b4b" size={21} />
                  <input
                    min="0"
                    max="50"
                    className="w-full text-black font-[Inter] outline-none"
                    type="number"
                    placeholder="Кол-во дней"
                    {...register("deadline_days", {
                      required: "Дедлайн не указан",
                    })}
                  />
                </div>
                <span className="text-xs text-red-500">
                  {errors.deadline_days && errors.deadline_days.message}
                </span>
              </div>
            </div>
          </div>
          {/* Вторая колонка */}
          <div className="flex flex-col w-full gap-y-2">
            <p className="text-xl font-bold text-black">Правила:</p>
            <div className="w-full flex flex-col gap-y-5 rounded-lg">
              <div className="flex flex-col gap-y-1">
                <label className="text-black font-medium">Настройки:</label>
                <ul className="flex flex-wrap gap-2">
                  {settings.map((name: string, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        if (settingsOpen.includes(name)) {
                          settingsOpen.splice(settingsOpen.indexOf(name), 1);
                          setSettingsOpen([...settingsOpen]);
                        } else {
                          settingsOpen.push(name);
                          setSettingsOpen([...settingsOpen]);
                        }
                      }}
                      className={`flex justify-center items-center text-sm text-white pt-2 pb-2 p-2 duration-150 cursor-pointer shadow-lg hover:bg-blue-600 rounded-md ${
                        settingsOpen.includes(name)
                          ? "bg-blue-600"
                          : "bg-[#a3a3a3]"
                      }`}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="token" className="text-black font-medium">
                  Token:
                </label>
                <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md">
                  <Fingerprint color="#4b4b4b" size={20} />
                  <input
                    className="w-full text-black font-[Inter] outline-none"
                    type="text"
                    id="token"
                    defaultValue={defaultToken}
                    placeholder="Введите токен"
                    {...register("token", { required: "Токен не указан" })}
                  />
                </div>
                <span className="text-xs text-red-500">
                  {errors.token && errors.token.message}
                </span>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-4">
                  <div className="flex flex-col gap-y-1 w-full">
                    <label className="text-black font-medium">
                      Дедлайн{" "}
                      <span className="text-sm text-[#737373]">(дней)</span>
                    </label>
                    <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md w-full">
                      <Timer color="#4b4b4b" size={21} />
                      <input
                        min="0"
                        max="50"
                        className="w-full text-black font-[Inter] outline-none"
                        type="number"
                        placeholder="Кол-во дней"
                        {...register("deadline_days_rules", {
                          required: "Дедлайн не указан",
                        })}
                      />
                    </div>
                    <span className="text-xs text-red-500">
                      {errors.deadline_days_rules &&
                        errors.deadline_days_rules.message}
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-1 w-full">
                    <label className="text-black font-medium">
                      Напоминание
                    </label>
                    <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md w-full">
                      <IdCard color="#4b4b4b" size={21} />
                      <input
                        min="0"
                        className="w-full text-black font-[Inter] outline-none"
                        type="number"
                        placeholder="Кол-во раз"
                        {...register("number_of_reminders", {
                          required: "Напоминание не указано",
                        })}
                      />
                    </div>
                    <span className="text-xs text-red-500">
                      {errors.number_of_reminders &&
                        errors.number_of_reminders.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-4">
                  <div className="flex flex-col gap-y-1 w-full">
                    <label className="text-black font-medium">Фрилансеры</label>
                    <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md w-full">
                      <Users color="#4b4b4b" size={21} />
                      <input
                        min="0"
                        max="50"
                        className="w-full text-black font-[Inter] outline-none"
                        type="number"
                        placeholder="Кол-во"
                        {...register("qty_freelancers", {
                          required: "Кол-во фрилансеров не указано",
                        })}
                      />
                    </div>
                    <span className="text-xs text-red-500">
                      {errors.qty_freelancers && errors.qty_freelancers.message}
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-1 w-full">
                    <label className="text-black font-medium">ID задачи</label>
                    <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md w-full">
                      <IdCard color="#4b4b4b" size={21} />
                      <input
                        min="0"
                        className="w-full text-black font-[Inter] outline-none"
                        type="number"
                        placeholder="Введите ID"
                        {...register("task_id", {
                          required: "ID задачи не указан",
                        })}
                      />
                    </div>
                    <span className="text-xs text-red-500">
                      {errors.task_id && errors.task_id.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-black font-medium">Бюджет:</label>
                <div className="flex gap-x-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md w-full">
                      <RussianRuble color="#4b4b4b" size={21} />
                      <input
                        min="0"
                        max="1000000"
                        className="w-full text-black font-[Inter] outline-none"
                        type="number"
                        placeholder="От"
                        {...register("budget_from_rules", {
                          required: "Бюджет от не указан",
                        })}
                      />
                    </div>
                    <span className="text-xs text-red-500">
                      {errors.budget_from_rules &&
                        errors.budget_from_rules.message}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-x-1 pt-2 pb-2 p-2 border border-solid border-[#dce3eb] rounded-md w-full">
                      <RussianRuble color="#4b4b4b" size={21} />
                      <input
                        min="0"
                        max="1000000"
                        className="w-full text-black font-[Inter] outline-none"
                        type="number"
                        placeholder="До"
                        {...register("budget_to_rules", {
                          required: "Бюджет до не указан",
                        })}
                      />
                    </div>
                    <span className="text-xs text-red-500">
                      {errors.budget_to_rules && errors.budget_to_rules.message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-4 mb-8 px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Создать
        </button>
      </form>
    </div>
  );
}

export default Main;
