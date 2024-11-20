export default function Logo({image, title, textColor}) {
    return (
        <div className="flex items-center px-3 py-[10px] gap-[10px] justify-center">
            <img src={`/assets/icons/${image}.svg`} alt="logo" />
            <p className={`text-[${textColor}] text-[20px] leading-7 font-bold`}>{title}</p>
        </div>
    )
}