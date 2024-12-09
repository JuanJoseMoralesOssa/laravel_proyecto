export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'mt-1 text-sm text-red-600 italic' + className}
        >
            {message}
        </p>
    ) : null;
}
