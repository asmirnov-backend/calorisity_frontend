import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useSnackbar } from "notistack";
import useDeleteMutation from "../../api/useDeleteMutation";

export const DeleteAction = (input: { id: string; url: string }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { trigger, isMutating } = useDeleteMutation(input);
  const { enqueueSnackbar } = useSnackbar();

  const doDelete = async () => {
    const res = await trigger();
    if (res.ok) {
      onClose();
      enqueueSnackbar("Успешно удалено", { variant: "success" });
      setTimeout(() => location.reload(), 2500);
    } else {
      enqueueSnackbar("Ошибка", { variant: "error" });
      console.log(await res.json());
    }
  };

  return (
    <>
      <Tooltip content="Удалить" className="bg-pink-400">
        <button onClick={onOpen}>
          <Trash2 fill="#f9a8d4" />
        </button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Удаление</ModalHeader>
          <ModalBody>Вы действительно хотите удалить?</ModalBody>
          <ModalFooter>
            <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
              <div className="flex flex-row gap-3 w-full">
                <Button
                  color="primary"
                  onPress={onClose}
                  isDisabled={isMutating}
                >
                  Назад
                </Button>
                <div className="flex flex-row gap-3 w-full"></div>
                <Button
                  color="danger"
                  isDisabled={isMutating}
                  onPress={doDelete}
                >
                  Удалить
                </Button>
              </div>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
