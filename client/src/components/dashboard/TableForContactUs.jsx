import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getContactUsData ,deleteContactUs} from "../../ReduxSlice/contactUsSlice";

const TableForContactUs = ({ title }) => {
  const [flag, setFlag] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getContactUsData());
  }, [flag]);


  const tableItems = useSelector((state) => state.contactUs.contactUsData) || [];
//   console.log(tableItems);


  const checked = (user_id) => {
    dispatch(deleteContactUs(user_id));
    setFlag(!flag);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            {title}
          </h3>
          <p className="text-gray-600 mt-2">{}</p>
        </div>
        <div className="mt-3 md:mt-0"></div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Full name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">message</th>
              {/* <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">pay</th> */}
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.message}</td>

                <td className="text-right px-6 whitespace-nowrap">
                  <button
                    onClick={() => {checked(item.contact_id)}}
                    className="py-2 leading-none px-3 font-medium text-green-500 hover:text-green-700 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Done
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

export default TableForContactUs;
