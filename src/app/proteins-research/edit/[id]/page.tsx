"use client";

import { Input, Button, CircularProgress } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { useRouter, useSearchParams } from "next/navigation";
import useMutation from "../../../../api/useMutation";
import useSubmit from "../../../../api/useSubmit";
import { ProteinsResearchForm } from "../../interfaces/ProteinsResearchForm.interface";
import useQuery from "../../../../api/useQuery";

export default function Page({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProteinsResearchForm>();

  const { data, isLoading } = useQuery<ProteinsResearchForm>(
    params.id,
    "/proteins-researches"
  );

  const { trigger, isMutating } = useMutation<ProteinsResearchForm>(
    "/proteins-researches",
    { method: "PUT", id: params.id }
  );

  const onSubmit = useSubmit<ProteinsResearchForm>({
    trigger,
  });

  if (isLoading) return <CircularProgress aria-label="Loading..." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isRequired
          label="Объём титранта первая параллель, г/см^3"
          type="number"
          variant="bordered"
          {...register("titrantVolumeParallelFirst", {
            value: data?.titrantVolumeParallelFirst,
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          isInvalid={formErrors.titrantVolumeParallelFirst ? true : false}
          errorMessage={formErrors.titrantVolumeParallelFirst?.message?.toString()}
        />
        <Input
          isRequired
          label="Объём титранта вторая параллель, г/см^3"
          type="number"
          variant="bordered"
          {...register("titrantVolumeParallelSecond", {
            value: data?.titrantVolumeParallelSecond,
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          isInvalid={formErrors.titrantVolumeParallelSecond ? true : false}
          errorMessage={formErrors.titrantVolumeParallelSecond?.message?.toString()}
        />
        <Input
          isRequired
          label="Объём контроля, г/см^3"
          type="number"
          variant="bordered"
          {...register("controlVolume", {
            value: data?.controlVolume,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.controlVolume ? true : false}
          errorMessage={formErrors.controlVolume?.message?.toString()}
        />
        <Input
          isRequired
          label="Коэффициент"
          type="number"
          variant="bordered"
          {...register("coefficient", {
            value: data?.coefficient,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.coefficient ? true : false}
          errorMessage={formErrors.coefficient?.message?.toString()}
        />
        <Button color="primary" disabled={isMutating} type="submit">
          Сохранить
        </Button>
        <Button color="danger" variant="flat" onClick={back}>
          Назад
        </Button>
      </div>
    </form>
  );
}