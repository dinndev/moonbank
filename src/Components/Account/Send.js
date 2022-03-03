import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useTransactionContext } from "/Users/aladinpenagunda/Desktop/Activities/moonbank/src/States/TransactionContext.js";
import { useAlert } from "react-alert";
import MoneySvg from "../Svg/MoneySvg";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
const Deposit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const alert = useAlert();
  const [onChangeDepositValue, setOnChangeDepositValue] = useState("");
  const [{}, dispatch] = useTransactionContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onChangeDepositValue !== "") {
      const deposit = parseFloat(onChangeDepositValue.replace(/\$|,/g, ""));
      dispatch({
        type: "DEPOSIT",
        deposit,
      });
      setOnChangeDepositValue("");
      alert.show(`${onChangeDepositValue} deposit to your account`, {
        // custom timeout just for this one alert
        type: "success",
      });
    } else {
      return;
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="" onSubmit={handleSubmit}>
              <label
                htmlFor="deposit"
                className="text-secondary text-xs font-robotoSemiBold "
              >
                Amount
              </label>
              <div className="flex mt-3 h-24">
                <CurrencyFormat
                  required
                  className="bg-navBg w-3/4 outline-none p-2 mr-2 rounded-lg text-3xl"
                  value={onChangeDepositValue}
                  thousandSeparator={true}
                  prefix={"$"}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setOnChangeDepositValue(formattedValue);
                  }}
                />
              </div>

              <Button
                className="my-5"
                colorScheme="blue"
                type="submit"
                mr={3}
                onClick={onClose}
              >
                Deposit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Deposit;
