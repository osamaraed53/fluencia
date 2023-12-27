
import { fetchStudent } from "../../ReduxSlice/courseUserSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  // const [student, setStudent] = useState([]);
  const [checkedUserIds, setCheckedUserIds] = useState([]);

  useEffect(() => {
    dispatch(fetchStudent(57));
  }, []);
  const students = useSelector((state) => state.courseUser.students);
console.log(students)

  const [areAllChecked, setAllChecked] = useState(true)
  let [checkboxItems, setCheckboxItem] = useState({})

  // set or unset all checkbox items
  const handleCheckboxItems = () => {
      setAllChecked(!areAllChecked)
      students.forEach((item, idx) => {
          checkboxItems[item.user_id] = !areAllChecked
          setCheckboxItem({ ...checkboxItems })
      })
  }
 console.log(checkboxItems)
  // Update checked value
  const handleCheckboxChange = (e, idx) => {
      setAllChecked(false)
      setCheckboxItem({ ...checkboxItems, [e.target.name]: e.target.checked })
  }

  useEffect(() => {
      // Set properties with false value
      students.forEach((item, idx) => {
          checkboxItems[item.user_id] = false
          setCheckboxItem({ ...checkboxItems })
      })
  }, [])

  useEffect(() => {
      // Check if all checkbox items are checked and update setAllChecked state
      const checkboxItemsVal = Object.values(checkboxItems)
      const checkedItems = checkboxItemsVal.filter(item => item == true)
      if (checkedItems.length == students.length) setAllChecked(true)
  }, [checkboxItems])



  


  return (
    <div className="max-w-screen-xl  px-4 md:px-8">

      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-lg  text-left">
          <thead className="text-[#fff] font-normal border-b bg-fluencia-dark-purple/80">
            <tr className="bg-fluencia-dark-purple/15">
              <th className="py-3 px-6 flex items-center gap-x-4 ">
                <div>
                  <input
                    type="checkbox"
                    id="checkbox-all-items"
                    className="checkbox-item peer hidden"
                    checked={areAllChecked}
                    onChange={handleCheckboxItems}
                  />
                  <label
                    htmlFor="checkbox-all-items"
                    className="relative flex w-5 h-5  peer-checked:bg-fluencia-dark-purple rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                  ></label>
                </div>
                Username
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {students.map((item, idx) => (
              <tr key={idx} className=" odd:bg-white">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                  <div>
                    <input
                      type="checkbox"
                      id={item.user_id}
                      name={item.user_id}
                      className="checkbox-item peer hidden"
                      checked={areAllChecked || checkboxItems[item.user_id]}
                      onChange={(e) => handleCheckboxChange(e, item.user_id)}
                    />
                    <label
                      htmlFor={item.user_id}
                      className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                    ></label>
                  </div>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img src={item.picture != null
                      ? item.picture
                      : "https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"} className="w-10 h-10 rounded-full" />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {item.first_name + " " + item.last_name}
                      </span>
                      <span className="block text-gray-700 text-xs">
                        {item.email}
                      </span>
                    </div>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {/* <button
          onClick={handlePerformAction}
          className="px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700"
        >
          Perform Action
        </button> */}
      </div>
    </div>
  );
};
