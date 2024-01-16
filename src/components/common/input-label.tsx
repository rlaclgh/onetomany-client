interface InputLabelProps {
  // input 상단에 보일 텍스트
  label: string;

  // react-hook-form 으로 관리하는 key 값
  name: string;
}
const InputLabel = (props: InputLabelProps) => {
  const { label, name } = props;
  return (
    <>
      <label className="text-sm text-black font-normal" htmlFor={name}>
        <div>{label}</div>
      </label>
    </>
  );
};

export default InputLabel;
