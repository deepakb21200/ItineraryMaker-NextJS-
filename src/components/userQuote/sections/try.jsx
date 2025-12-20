import React from 'react'

function trys() {
      
    const [activeDays, setActiveDays] = useState(1);
  const [dayDropdown, setDayDropdown] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);


  // lock
    const [rows, setRows] = useState([
      {
        type: "",
        quantity: "",
        dropdownOpen: false,
      },
    ]);
  
   
  
    const handleAddRow = () => {
    if (rows.length < maxRows) {
      setRows(prev => [
        ...prev,
        {
          type: "",
          quantity: "",
          dropdownOpen: false,
        },
      ]);
    }
  };
  
  
   
   
  
   
  
  const handleRemoveRow = (rowIndex) => {
    setSelectedValues(prev => {
      const updated = [...prev];
      updated.splice(rowIndex, 1); // remove specific row safely
      return updated;
    });
  
    // Optional: adjust activeDays if you are still using it
    setActiveDays(prev => Math.max(prev - 1, 0));
  };
  
  
    const handleTypeChange = (index, value) => {
    setRows(prev =>
      prev.map((row, i) =>
        i === index ? { ...row, type: value } : row
      )
    );
  };
   
    const toggleDropdown = (index, value) => {
    setRows(prev =>
      prev.map((row, i) =>
        i === index ? { ...row, dropdownOpen: value } : row
      )
    );
  };
  
   
  
    const handleQuantityChange = (index, value) => {
    setRows(prev =>
      prev.map((row, i) =>
        i === index ? { ...row, quantity: value } : row
      )
    );
  };
  
  
   
  
   
  const handleNext = () => {
    // Find first stayNights2 date that is not yet selected
    const nextNight = stayNights2.find(night => 
      !selectedValues.some(selected => selected.date === night.date)
    );
  
    if (!nextNight) return; // agar sab selected ho gaye
  
    setSelectedValues(prev => [...prev, nextNight]);
    setActiveDays(prev => prev + 1); // optional
  };
  
  
   
  
   
  
  const handleCheckboxSelect = (rowIndex, night) => {
    setSelectedValues(prev => {
      const updated = [...prev];
      updated[rowIndex] = night; // assign selected night to specific row
      return updated;
    });
  };












const [selectedValues, setSelectedValues] = useState([]);

const handleToggle = (night) => {
  setSelectedValues(prev => {
    const exists = prev.some(item => item.date === night.date);

    if (exists) {
      // untick → remove
      return prev.filter(item => item.date !== night.date);
    } else {
      // tick → add
      return [...prev, night];
    }
  });
};


  return (
    <div>try</div>
  )
}

export default trys