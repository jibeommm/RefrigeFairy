import { useState } from "react";
import { useBarcodeQuery } from "../hooks/useBarcodeQuery";
import Modal from "./Modal";
import type { Food } from "../types/food";

export default function BarcodeInput() {
  const [barcode, setBarcode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useBarcodeQuery(isOpen ? barcode : "");


  const handleSearch = () => {
    if (barcode) setIsOpen(true);
  };


  return (
    <div>
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="바코드 입력"
      />
      <button onClick={handleSearch}>조회</button>

  
      {isOpen && (
        <>
          {isLoading && <p>로딩 중...</p>}
          {isError && <p>에러 발생</p>}
          {data && (
            <Modal
              food={data}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)} 
            />
          )}
        </>
      )}
    </div>
  );
}
