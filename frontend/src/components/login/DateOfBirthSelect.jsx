import { useMediaQuery } from "react-responsive";
const DateOfBirthSelect = ({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleRegisterChange,
  dateError,
}) => {
  // const view1 = useMediaQuery({
  //   query: "(min-width: 539px)",
  // });
  // const view2 = useMediaQuery({
  //   query: "(min-width: 850px)",
  // });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
    >
      <select name="bDay" value={bDay} onChange={handleRegisterChange}>
        {days.map((day, index) => (
          <option value={day} key={index}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
        {months.map((month, index) => (
          <option value={month} key={index}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleRegisterChange}>
        {years.map((year, index) => (
          <option value={year} key={index}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
};

export default DateOfBirthSelect;
