import React from 'react';
import './Table.css';
import Table from 'react-bootstrap/Table';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";

const TableView = () => {
  return (
    <div className='table_main'>
      <div className='announcement_div'>
        <button>
          <svg width="25" height="30" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_328_2780" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="32">
              <rect x="0.237152" width="31.8286" height="31.9786" rx="5" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_328_2780)">
              <path d="M25.441 17.3218C24.7052 17.3218 24.1086 16.7252 24.1086 15.9893V15.9893C24.1086 15.2534 24.7052 14.6569 25.441 14.6569H28.0809C28.8168 14.6569 29.4134 15.2534 29.4134 15.9893V15.9893C29.4134 16.7252 28.8168 17.3218 28.0809 17.3218H25.441ZM26.4993 25.5781C26.0585 26.1687 25.2215 26.2882 24.6329 25.8447L22.5138 24.2479C21.9289 23.8072 21.8103 22.9767 22.2483 22.3898V22.3898C22.6892 21.7993 23.5262 21.6797 24.1148 22.1232L26.2339 23.72C26.8188 24.1607 26.9374 24.9913 26.4993 25.5781V25.5781ZM24.1148 9.85541C23.5262 10.2989 22.6892 10.1794 22.2483 9.58878V9.58878C21.8103 9.00195 21.9289 8.17143 22.5138 7.73073L24.6329 6.13391C25.2215 5.69038 26.0585 5.80996 26.4993 6.40054V6.40054C26.9374 6.98736 26.8188 7.81789 26.2339 8.25858L24.1148 9.85541ZM8.19432 25.3164C7.46188 25.3164 6.86813 24.7226 6.86813 23.9902V21.3128C6.86813 20.5804 6.27437 19.9866 5.54194 19.9866V19.9866C4.81253 19.9866 4.18812 19.7257 3.66869 19.2038C3.14927 18.682 2.88956 18.0546 2.88956 17.3218V14.6569C2.88956 13.924 3.14927 13.2967 3.66869 12.7748C4.18812 12.2529 4.81253 11.992 5.54194 11.992H9.79561C10.4833 11.992 11.1579 11.8044 11.7469 11.4493V11.4493C14.2659 9.93081 17.4777 11.7449 17.4777 14.6862V17.2924C17.4777 20.2337 14.2659 22.0478 11.7469 20.5293L11.0938 20.1356C10.9321 20.0381 10.7469 19.9866 10.5581 19.9866V19.9866C9.98507 19.9866 9.52051 20.4512 9.52051 21.0243V23.9902C9.52051 24.7226 8.92675 25.3164 8.19432 25.3164V25.3164ZM12.0159 17.5833C13.2537 18.3193 14.8253 17.4294 14.8253 15.9893V15.9893C14.8253 14.5493 13.2537 13.6593 12.0159 14.3953V14.3953C11.7284 14.5663 11.3995 14.6569 11.065 14.6569H6.87438C6.13849 14.6569 5.54194 15.2534 5.54194 15.9893V15.9893C5.54194 16.7252 6.13849 17.3218 6.87438 17.3218H11.065C11.3995 17.3218 11.7284 17.4123 12.0159 17.5833V17.5833ZM20.2461 18.5043C19.8404 19.3566 18.8038 18.9563 18.8038 18.0124V13.9662C18.8038 13.0223 19.8404 12.622 20.2461 13.4743V13.4743C20.6108 14.2405 20.7931 15.0788 20.7931 15.9893C20.7931 16.8998 20.6108 17.7381 20.2461 18.5043V18.5043Z" fill="white" />
            </g>
          </svg>

          Announcement 1/1
        </button>

        <p>
          Applicants are advised to pay attestation fee one day before the deadline.
        </p>
      </div>

      <div className='application_main'>

        <div className='heading'>
          <h5>REGISTRATION</h5>

          <div className='search_tables'>
            <div>
              <input placeholder='Application ID' />
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#787878" />
              </svg>
            </div>
            <div>
              <input placeholder='Filter' />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_351_738" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_351_738)">
                  <path d="M11 20C10.7167 20 10.4792 19.9042 10.2875 19.7125C10.0959 19.5208 10 19.2833 10 19V13L4.20002 5.6C3.95002 5.26667 3.91252 4.91667 4.08752 4.55C4.26252 4.18333 4.56669 4 5.00002 4H19C19.4334 4 19.7375 4.18333 19.9125 4.55C20.0875 4.91667 20.05 5.26667 19.8 5.6L14 13V19C14 19.2833 13.9042 19.5208 13.7125 19.7125C13.5209 19.9042 13.2834 20 13 20H11ZM12 12.3L16.95 6H7.05002L12 12.3Z" fill="#787878" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* <div>
          <MuiDataTable />
        </div> */}

        <div className='application_table'>
          <Table responsive>
            <thead>
              <tr>
                <th>Applicant id</th>
                <th>reference no</th>
                <th>full name</th>
                <th>father name</th>
                <th>date</th>
                <th className='text-center'>status</th>
                <th>View</th>
                <th>Download</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0431</td>
                <td>CDA/DLR/(1022)I-12/1/110</td>
                <td>Fida Muhammad Khan</td>
                <td>Sher Muhammad Khan</td>
                <td>10-Sep-1985</td>
                <td className='text-center'> <span className='ok_td'>ok</span></td>
                <td className='text-center' style={{ color: "#299205" }}><MdOutlineRemoveRedEye /></td>
                <td className='text-center' style={{ color: "#0094FF" }}><MdOutlineFileDownload /></td>
                <td className='text-center'><HiOutlineDotsVertical /></td>
              </tr>
              <tr>
                <td>0431</td>
                <td>CDA/DLR/(1022)I-12/1/110</td>
                <td>Fida Muhammad Khan</td>
                <td>Sher Muhammad Khan</td>
                <td>10-Sep-1985</td>
                <td className='text-center'> <span className='rejected_td'>Rejected</span> </td>
                <td className='text-center' style={{ color: "#299205" }}><MdOutlineRemoveRedEye /></td>
                <td className='text-center' style={{ color: "#0094FF" }}><MdOutlineFileDownload /></td>
                <td className='text-center'><HiOutlineDotsVertical /></td>
              </tr>
              <tr>
                <td>0431</td>
                <td>CDA/DLR/(1022)I-12/1/110</td>
                <td>Fida Muhammad Khan</td>
                <td>Sher Muhammad Khan</td>
                <td>10-Sep-1985</td>
                <td className='text-center'> <span className='processing_td'> Processing </span> </td>
                <td className='text-center' style={{ color: "#299205" }}><MdOutlineRemoveRedEye /></td>
                <td className='text-center' style={{ color: "#0094FF" }}><MdOutlineFileDownload /></td>
                <td className='text-center'><HiOutlineDotsVertical /></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default TableView
