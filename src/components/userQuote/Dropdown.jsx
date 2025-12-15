import React from 'react'

function Dropdown() {
  return (
    <div   className='absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 animate-fadeIn bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]'
              onMouseDown={(e) => e.preventDefault()} >
              {stayNights2.length > 0 &&
                stayNights2.map((date, index) => (
                  <div key={index} className="flex items-center px-3 py-2 cursor-pointer border-b-2 border-grey">
                    <input
                      type="checkbox"
                      id={`night-${index}`}
                      name="selectedNights"
                      value={date}
                      className="mr-2"
                      onClick={()=>{
                        // code here
                        let a = [...rows]

                      }}
                    />
                    <label htmlFor={`night-${index}`}>{date}</label>
                  </div>
                ))}
            </div>
  )
}

export default Dropdown