export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block mb-1 text-sm font-bold text-gray-700 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
