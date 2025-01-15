import React,{useId} from 'react'

const Select = React.forwardRef(function({
    label,
    options=[],
    className="",
    ...props
}, ref) {
  const id = useId()
  return (
    <div className="w-full">
        {label && <label htmlFor={id} >{label}</label>}
        <Select 
        id={id} 
        ref={ref} 
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option) => (
                <option value={option} key={option}>
                {option}
            </option>
            ))}
        </Select>
    </div>
  )
})

export default Select