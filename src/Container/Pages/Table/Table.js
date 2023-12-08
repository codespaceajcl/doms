import React, { useEffect, useState } from 'react';
import './Table.css';
import Table from 'react-bootstrap/Table';
import { MdOutlineRemoveRedEye, MdOutlineFileDownload } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { applicationGet } from '../../../Redux/Action/Dashboard';
import Loader from '../../../Utils/Loader';
import { getCurrentUser } from '../../../Utils/Helper';
import { pdfjs } from 'react-pdf';
import { MdClose } from "react-icons/md";
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import Announcement from '../../../Components/Announcement/Announcement';
import { Form } from 'react-bootstrap';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const TableView = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [searchNo, setSearchNo] = useState('')
  const [getTableData, setGetTableData] = useState([])
  const [showPdf, setShowPdf] = useState(false)
  const [previewPdf, setPreviewPdf] = useState('')
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [showCrudList, setShowCrudList] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const [selectedFields, setSelectedFields] = useState([
    'referenceNo',
    'fullName',
    'serialNo',
    'cdaSerialNo',
    'date',
    'videOrderDate',
  ]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { loading, tableGetData, error } = useSelector((state) => state.getTable)

  useEffect(() => {
    const currentUser = getCurrentUser();
    const formData = new FormData();
    formData.append("token", currentUser?.token)
    formData.append("email", currentUser?.email)

    dispatch(applicationGet(formData))

  }, [])

  useEffect(() => {
    setGetTableData(tableGetData?.data)
  }, [tableGetData])

  const handleCheckboxChange = (fieldName) => {
    const updatedFields = selectedFields.includes(fieldName)
      ? selectedFields.filter((field) => field !== fieldName)
      : [...selectedFields, fieldName];

    const filteredData = tableGetData?.data?.filter((t) =>
      updatedFields.some(
        (field) =>
          t[field] &&
          t[field].toString().toLowerCase().includes(searchNo)
      )
    );

    setGetTableData(filteredData);
    setSelectedFields(updatedFields);
  };

  const searchHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (!searchTerm) {
      setGetTableData(tableGetData?.data);
    }

    else if (getTableData) {
      const filteredData = tableGetData?.data?.filter((t) =>
        selectedFields.some(
          (field) =>
            t[field] &&
            t[field].toString().toLowerCase().includes(searchTerm)
        )
      );

      setGetTableData(filteredData);
    }

    setSearchNo(e.target.value);
  };

  const previewHandler = (getDoc) => {
    setPreviewPdf(getDoc)
    setShowPdf(true)
  }

  const handleShowCrudToggle = (index) => {
    const updatedShowCrudList = [...showCrudList];
    updatedShowCrudList[index] = !updatedShowCrudList[index];
    setShowCrudList(updatedShowCrudList);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = getTableData?.slice(offset, offset + itemsPerPage).map((t, i) => {
    return (
      <tr>
        <td>{t?.referenceNo}</td>
        <td>{t?.fullName}</td>
        <td>{t?.serialNo}</td>
        <td>{t?.cdaSerialNo}</td>
        <td>{moment(t?.date).format('L')} </td>
        <td className='text-center'>{moment(t?.videOrderDate).format('L')}</td>
        <td className='text-center'>
          <span style={{ color: "#299205", marginRight: "5px" }}><MdOutlineRemoveRedEye onClick={t.document ? () => previewHandler(t.document) : null} /></span>
          <span> <a style={{ textDecoration: "none" }} href={t.document ? t.document : null} target='_blank'>
            <MdOutlineFileDownload /> </a> </span>
        </td>
        <td><span className='table_dots' onClick={() => handleShowCrudToggle(i)}> <HiOutlineDotsVertical />
          {
            showCrudList[i] &&
            <div>
              <ul>
                <li>Edit</li>
                <li>Delete</li>
              </ul>
            </div>
          }
        </span></td>
      </tr>
    )
  });

  const pageDecrease = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const pageIncrease = () => {
    if (pageNumber !== numPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  return (
    <div className='table_main'>
      <Announcement />

      <div className='application_main'>

        <div className='heading'>
          <h5>APPLICATIONS</h5>

          <div className='search_tables'>
            <div className='searching'>
              <input
                className='search_no'
                placeholder='Search'
                value={searchNo}
                name="searchNo"
                onChange={searchHandler}
              />
              {/* <svg onClick={searchHandler} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none">
                <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#787878" />
              </svg> */}
              <svg onClick={() => setShowFilter(!showFilter)} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_351_738" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_351_738)">
                  <path d="M11 20C10.7167 20 10.4792 19.9042 10.2875 19.7125C10.0959 19.5208 10 19.2833 10 19V13L4.20002 5.6C3.95002 5.26667 3.91252 4.91667 4.08752 4.55C4.26252 4.18333 4.56669 4 5.00002 4H19C19.4334 4 19.7375 4.18333 19.9125 4.55C20.0875 4.91667 20.05 5.26667 19.8 5.6L14 13V19C14 19.2833 13.9042 19.5208 13.7125 19.7125C13.5209 19.9042 13.2834 20 13 20H11ZM12 12.3L16.95 6H7.05002L12 12.3Z" fill="#787878" />
                </g>
              </svg>

              {
                showFilter &&
                <div className='filter_checkboxes'>
                  <div key={`inline-checkbox`}>
                    {['referenceNo', 'fullName', 'serialNo', 'cdaSerialNo', 'date', 'videOrderDate'].map((fieldName) => (
                      <Form.Check
                        key={fieldName}
                        inline
                        label={fieldName}
                        name="group1"
                        type={'checkbox'}
                        checked={selectedFields.includes(fieldName)}
                        onChange={() => handleCheckboxChange(fieldName)}
                      />
                    ))}
                  </div>
                </div>
              }
            </div>
            {/* <div className='filteration'>
              <p onClick={() => setShowFilter(!showFilter)}>Filter</p>
              <svg onClick={() => setShowFilter(!showFilter)} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_351_738" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_351_738)">
                  <path d="M11 20C10.7167 20 10.4792 19.9042 10.2875 19.7125C10.0959 19.5208 10 19.2833 10 19V13L4.20002 5.6C3.95002 5.26667 3.91252 4.91667 4.08752 4.55C4.26252 4.18333 4.56669 4 5.00002 4H19C19.4334 4 19.7375 4.18333 19.9125 4.55C20.0875 4.91667 20.05 5.26667 19.8 5.6L14 13V19C14 19.2833 13.9042 19.5208 13.7125 19.7125C13.5209 19.9042 13.2834 20 13 20H11ZM12 12.3L16.95 6H7.05002L12 12.3Z" fill="#787878" />
                </g>
              </svg>

              {
                showFilter &&
                <div className='filter_checkboxes'>
                  <div key={`inline-checkbox`}>
                    <Form.Check
                      inline
                      label="Reference No."
                      name="group1"
                      type={'checkbox'}
                    />
                    <Form.Check
                      inline
                      label="Full Name"
                      name="group1"
                      type={'checkbox'}
                    />
                    <Form.Check
                      inline
                      label="Serial No."
                      name="group1"
                      type={'checkbox'}
                    />
                    <Form.Check
                      inline
                      label="CDA Serial No."
                      name="group1"
                      type={'checkbox'}
                    />
                    <Form.Check
                      inline
                      label="Date"
                      name="group1"
                      type={'checkbox'}
                    />
                    <Form.Check
                      inline
                      label="Vide Order Date"
                      name="group1"
                      type={'checkbox'}
                    />
                  </div>
                </div>
              }
            </div> */}
          </div>
        </div>

        {
          loading ? <div className='py-3'>
            <Loader />
          </div> :
            <div className='application_table'>
              <Table responsive>
                <thead>
                  <tr>
                    <th>reference no</th>
                    <th>full name</th>
                    <th>serial No</th>
                    <th>CDA Serial No</th>
                    <th>Date</th>
                    <th>vide Order Date</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems}
                </tbody>
              </Table>

              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.ceil(getTableData?.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
            </div>
        }

        {
          showPdf && <div className='preview_show' style={{ transition: "all 0.3s ease" }}>
            <div className='preview_show_data'>
              <MdClose onClick={() => setShowPdf(false)} className='close_icon' />

              <Document file={previewPdf} onLoadSuccess={onDocumentLoadSuccess} loading={<Loader color={"#fff"} />}>
                <Page pageNumber={pageNumber} />
              </Document>

              <div className='pdf_chevron'>
                <FaChevronLeft onClick={pageDecrease} />
                <FaChevronRight onClick={pageIncrease} />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default TableView
