import { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useTransactionContext } from "/Users/aladinpenagunda/Desktop/Activities/moonbank/src/States/TransactionContext.js";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
const Deposit = () => {
  const { register, handleSubmit, resetField } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const alert = useAlert();
  const [onChangeDepositValue, setOnChangeDepositValue] = useState("");
  const [{ accounts, user, totalFunds }, dispatch] = useTransactionContext();
  const getAmount = (data) => {
    const minimunAmountToSend = 100;
    const maximumAmountToSend = 50000;
    const parsedAmount = parseInt(data.amount);
    if (parsedAmount > user.totalFunds) {
      alert.show(`can't send ${parsedAmount} higher than the total funds`, {
        type: "error",
      });
    } else {
      if (
        parsedAmount <= maximumAmountToSend &&
        parsedAmount >= minimunAmountToSend
      ) {
        dispatch({
          type: "SEND_FUNDS",
          amount: parsedAmount,
          id: data.id,
        });
        dispatch({
          type: "SUBTRACT_SENT_AMOUNT",
          amount: parsedAmount,
        });
        resetField("amount");
        alert.show(`succesfully sent ${parsedAmount} to ${data.id}`, {
          type: "success",
        });
        onClose();
        return;
      } else {
        alert.show("Invalid amount", { type: "error" });
        onClose();
      }
    }
  };

  return (
    <>
      <button
        className="mx-1 font-robotoSemiBold text-sm p-3 text-primary hover:-translate-y-1 hover:scale-110 hover:text-white hover:bg-primary duration-300 bg-white rounded-md"
        onClick={onOpen}
      >
        Send
      </button>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send to</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="" onSubmit={handleSubmit(getAmount)}>
              <Select
                name="id"
                {...register("id", { required: "true" })}
                className="my-5"
                placeholder="Users"
              >
                {accounts.map(
                  ({ email, id }) =>
                    email !== user.email && (
                      <option key={id} value={id}>{`${email}`}</option>
                    )
                )}
              </Select>
              <label
                htmlFor="amount"
                className="text-secondary text-xs font-robotoSemiBold "
              >
                Amount
              </label>
              <div className="flex mt-3 h-24">
                <input
                  className="bg-navBg w-3/4 outline-none p-6 mr-2 rounded-lg text-3xl"
                  type="text"
                  name="amount"
                  {...register("amount", { required: "true" })}
                />
              </div>
              <Button className="my-5" colorScheme="blue" type="submit" mr={3}>
                Send
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Deposit;
