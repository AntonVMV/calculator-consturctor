import { CalculatorElems } from "store/slices/mainSlice";
import { Operators } from "./Operators/Operators";
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
      {type === "display" && <Display />}
      {type === "operators" && <Operators isActive={isActive} />}
      {type === "numbers" && <Numbers isActive={isActive} />}
      {type === "result" && <Result isActive={isActive} />}
    </>
  );
};
