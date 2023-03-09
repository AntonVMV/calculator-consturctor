import { CalculatorElems } from "store/slices/mainSlice";
import { Digits } from "./Digits/Digits";
import { Numbers } from "./Numbers/Numbers";
import { Result } from "./Result/Result";
import { Display } from "./Display/Display";

interface CalculatorElementsProps {
  type: CalculatorElems;
  isActive?: boolean;
}

export const CalculatorElements: React.FC<CalculatorElementsProps> = ({
  type,
  isActive = true,
}) => {
  return (
    <>
      {type === "table" && <Display />}
      {type === "digits" && <Digits isActive={isActive} />}
      {type === "numbers" && <Numbers isActive={isActive} />}
      {type === "result" && <Result isActive={isActive} />}
    </>
  );
};
