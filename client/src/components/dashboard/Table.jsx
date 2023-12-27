import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchAllUsers,softDeleteUser} from '../../ReduxSlice/usersSlice'
const TableForUsers = () => {
  const dispatch = useDispatch()
  const tableItems = useSelector((state)=>state.user.users)
  const [flag ,setFlag] = useState(true)
  console.log(tableItems)

  useEffect(()=>{ 
    dispatch(fetchAllUsers());
  },[flag])
  
  const blockUser = (user_id)=>{
    dispatch(softDeleteUser(user_id))
    setFlag(!flag)
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            All users
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <a
            href="javascript:void(0)"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add member
          </a>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 flex items-center gap-x-4">
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
                    className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                  ></label>
                </div>
                Username
              </th>
              <th className="py-3 px-6">first name</th>
              <th className="py-3 px-6">Last name</th>
              <th className="py-3 px-6">phone</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">pay</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                  <div>
                    <input
                      type="checkbox"
                      id={`checkbox-${idx}`}
                      name={`checkbox-${idx}`}
                      className="checkbox-item peer hidden"
                      checked={checkboxItems[`checkbox${idx}`]}
                      onChange={(e) => handleCheckboxChange(e, idx)}
                    />
                    <label
                      htmlFor={`checkbox-${idx}`}
                      className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                    ></label>
                  </div>
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.first_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.last_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{`${item.is_pay}`}</td>
                <td className="text-right px-6 whitespace-nowrap">
                  <a
                    href="javascript:void()"
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </a>
                  <button
                    onClick={()=>{blockUser(item.user_id)}}
                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-700 duration-150 hover:bg-gray-50 rounded-lg"
                  >

                    block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default TableForUsers;


  // const [areAllChecked, setAllChecked] = useState(false);
  // let [checkboxItems, setCheckboxItem] = useState({});

  // set or unset all checkbox items
  // const handleCheckboxItems = () => {
    // setAllChecked(!areAllChecked);
    // tableItems.forEach((item, idx) => {
    //   checkboxItems[`checkbox${idx}`] = !areAllChecked;
    //   setCheckboxItem({ ...checkboxItems });
    // });
  // };

  // Update checked value
  // const handleCheckboxChange = (e, idx) => {
    // setAllChecked(false);
    // setCheckboxItem({ ...checkboxItems, [`checkbox${idx}`]: e.target.checked });
  // };

  // useEffect(() => {
  //   // Set properties with false value
  //   // tableItems.forEach((item, idx) => {
  //   //   checkboxItems[`checkbox${idx}`] = false;
  //   //   setCheckboxItem({ ...checkboxItems });
  //   // });
  // }, []);

  // useEffect(() => {
  //   // Check if all checkbox items are checked and update setAllChecked state
  //   const checkboxItemsVal = Object.values(checkboxItems);
  //   const checkedItems = checkboxItemsVal.filter((item) => item == true);
  //   if (checkedItems.length == tableItems.length) setAllChecked(true);
  // }, [checkboxItems]);