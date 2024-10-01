"use client";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import useSubmit from "../../../api/useSubmit";
import { FatsResearchForm } from "../../../interfaces/FatsResearchForm.interface";
import useMutation from "../../../api/useMutation";

export default function Page() {
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FatsResearchForm>();

  const { trigger, isMutating } =
    useMutation<FatsResearchForm>("/fats-researches");

  const onSubmit = useSubmit<FatsResearchForm>({
    trigger,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isDisabled
          isRequired
          readOnly
          label="Идентификатор пробы"
          variant="bordered"
          {...register("probeId", {
            required: "Поле обязательно",
            value: searchParams!.get("probe-id") ?? undefined,
          })}
          errorMessage={formErrors.probeId?.message?.toString()}
          isInvalid={formErrors.probeId ? true : false}
        />
        <Input
          isRequired
          label="Масса патрона до экстракции первая параллель, г"
          type="number"
          variant="bordered"
          {...register("patronMassBeforeExtractionParallelFirst", {
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          errorMessage={formErrors.patronMassBeforeExtractionParallelFirst?.message?.toString()}
          isInvalid={
            formErrors.patronMassBeforeExtractionParallelFirst ? true : false
          }
        />
        <Input
          isRequired
          label="Масса патрона до экстракции вторая параллель, г"
          type="number"
          variant="bordered"
          {...register("patronMassBeforeExtractionParallelSecond", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          errorMessage={formErrors.patronMassBeforeExtractionParallelSecond?.message?.toString()}
          isInvalid={
            formErrors.patronMassBeforeExtractionParallelSecond ? true : false
          }
        />
        <Input
          isRequired
          label="Масса патрона после экстракции первая параллель, г"
          type="number"
          variant="bordered"
          {...register("patronMassAfterExtractionParallelFirst", {
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          errorMessage={formErrors.patronMassAfterExtractionParallelFirst?.message?.toString()}
          isInvalid={
            formErrors.patronMassAfterExtractionParallelFirst ? true : false
          }
        />
        <Input
          isRequired
          label="Масса патрона после экстракции вторая параллель, г"
          type="number"
          variant="bordered"
          {...register("patronMassAfterExtractionParallelSecond", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          errorMessage={formErrors.patronMassAfterExtractionParallelSecond?.message?.toString()}
          isInvalid={
            formErrors.patronMassAfterExtractionParallelSecond ? true : false
          }
        />
        <Button color="primary" disabled={isMutating} type="submit">
          Создать
        </Button>
        <Button color="danger" variant="flat" onClick={back}>
          Назад
        </Button>
      </div>
    </form>
  );
}