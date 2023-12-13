import React, { useEffect, useRef, useState } from 'react';
import './Table.css';
import Table from 'react-bootstrap/Table';
import { MdOutlineRemoveRedEye, MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationUpload, applicationGet } from '../../../Redux/Action/Dashboard';
import Loader from '../../../Utils/Loader';
import { getCurrentUser } from '../../../Utils/Helper';
import { pdfjs } from 'react-pdf';
import { MdClose } from "react-icons/md";
import { Document, Page } from 'react-pdf';
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import Announcement from '../../../Components/Announcement/Announcement';
import { Form, Modal, Spinner } from 'react-bootstrap';
import { successNotify } from '../../../Utils/Toast';
import { FiColumns } from "react-icons/fi";
import moment from 'moment';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const TableView = () => {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const columnRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [searchNo, setSearchNo] = useState('')
  const [getTableData, setGetTableData] = useState([])
  const [showPdf, setShowPdf] = useState(false)
  const [previewPdf, setPreviewPdf] = useState('')
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [showFilter, setShowFilter] = useState(false)
  const [selectedFields, setSelectedFields] = useState([
    'referenceNo',
    'serialNo',
    'cdaSerialNo',
    'fullName',
    'plot'
  ]);
  const [getIndvId, setGetIndvId] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [showColumns, setShowColumns] = useState(false)
  const [showingFields, setShowingFields] = useState({
    Ref_No: true,
    Doc_Serial_No: true,
    CDA_Serial_No: true,
    Address: true,
    Street: true,
    Sector: true,
    Plot_No: true,
    Owner_Name: true,
    country: false,
    state: false,
    city: false,
    plotSize: false,
    videOrderDate: false
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { loading, tableGetData } = useSelector((state) => state.getTable)
  const { loading: uploadLoading, applicationUploadData } = useSelector((state) => state.postApplicationUpload)

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

  useEffect(() => {
    if (applicationUploadData?.response === 'success') {
      setGetIndvId('')
      setFile(null)
      successNotify("Sign Off Document Uploaded Successfully!")
      dispatch({ type: "APPLICATION_UPLOAD_RESET" })

      const currentUser = getCurrentUser();
      const formData = new FormData();
      formData.append("token", currentUser?.token)
      formData.append("email", currentUser?.email)

      dispatch(applicationGet(formData))
      setShowConfirm(false)
    }
  }, [applicationUploadData])

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

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile)
      setShowConfirm(true)
    }
  };

  const handleIconClick = (getId) => {
    setGetIndvId(getId)
    document.getElementById('fileInput').click();
  };

  const getCellStyles = (field) => {
    const styles = {};
    if (field === 'Ref_No') {
      styles.paddingLeft = '15px';
    }
    return styles;
  };

  const getFieldValue = (data, field) => {
    switch (field) {
      case 'Ref_No':
        return data.referenceNo;
      case 'Doc_Serial_No':
        return data?.serialNo;
      case 'CDA_Serial_No':
        return data?.cdaSerialNo;
      case 'Address':
        return data?.address;
      case 'Street':
        return data?.street;
      case 'Sector':
        return data?.sector;
      case 'Plot_No':
        return data?.plot;
      case 'Owner_Name':
        return `${data?.fullName} ${data?.fatherName}`;
      case 'videOrderDate':
        return moment(data?.videOrderDate).subtract(10, 'days').calendar()
      default:
        return data[field];
    }
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = getTableData?.slice(offset, offset + itemsPerPage).map((t, i) => {
    return (
      <tr key={t?.id}>
        {Object.keys(showingFields).map((field) => (
          showingFields[field] && (
            <td key={field} style={getCellStyles(field)}>
              {getFieldValue(t, field)}
            </td>
          )
        ))}
        <td className='text-center'>
          <span style={{ color: "#299205", marginRight: "5px" }}>
            <MdOutlineRemoveRedEye onClick={t.document ? () => previewHandler(t.document) : null} />
          </span>
          <span>
            <a style={{ textDecoration: "none" }} href={t.document ? t.document : null} target='_blank'>
              <MdOutlineFileDownload />
            </a>
          </span>
        </td>
        <td style={{ color: "#5454d8", textAlign: "center", cursor: "pointer", paddingRight: "15px" }}>
          {t.signOffDocument === 'no' ? (
            <span>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <MdOutlineFileUpload onClick={() => handleIconClick(t?.id)} />
            </span>
          ) : (
            <span>
              <a style={{ textDecoration: "none" }} href={t.signOffDocument ? t.signOffDocument : null} target='_blank'>
                <MdOutlineFileDownload style={{ color: "rgb(41, 146, 5)" }} />
              </a>
            </span>
          )}
        </td>
      </tr>
    );
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

  const uploadHandler = () => {
    const currentUser = getCurrentUser();
    const formData = new FormData();
    formData.append("token", currentUser?.token)
    formData.append("email", currentUser?.email)
    formData.append("documentId", getIndvId)
    formData.append("signOff", file)

    dispatch(ApplicationUpload(formData))
  }

  const modal = <Modal show={showConfirm} centered className='logout_modal'>
    <Modal.Body>
      <h3>Are you sure you want to Upload the File?</h3>
      <div className='d-flex justify-content-center' style={{ gap: "20px" }}>
        <button onClick={uploadHandler}> {uploadLoading ? <Spinner animation="border" size="sm" /> : 'Yes'}</button>
        <button className='no_btn' onClick={() => {
          setGetIndvId('')
          setFile(null)
          setShowConfirm(false)
        }}>No</button>
      </div>
    </Modal.Body>
  </Modal>

  const getColumnWidth = (field) => {
    switch (field) {
      case "Ref_No":
        return "100px";
      case "Address":
        return "120px";
      case "Street":
        return "80px";
      case "Owner_Name":
        return "100px";
      default:
        return "auto";
    }
  };

  const getPaddingLeft = (field) => {
    switch (field) {
      case "Ref_No":
        return "15px";
      default:
        return "5px";
    }
  };

  const getFieldLabel = (field) => {
    switch (field) {
      case "Ref_No":
        return "Ref. No.";
      case "Doc_Serial_No":
        return "Doc. Serial No.";
      case "CDA_Serial_No":
        return "CDA Serial No.";
      case "Address":
        return "Address";
      case "Street":
        return "Street";
      case "Sector":
        return "Sector";
      case "Plot_No":
        return "Plot No";
      case "Owner_Name":
        return "Owner Name";
      default:
        return field;
    }
  };

  const downloadCSV = () => {
    const headerFields = Object.keys(showingFields).filter(field => showingFields[field]);
    const headerRow = headerFields.map(field => getFieldLabel(field));
    // headerRow.push('View Download', 'SignOff Upload / Download');

    const dataRows = getTableData?.map(t => {
      const dataRow = headerFields.map(field => getFieldValue(t, field));
      // dataRow.push(t.document || '', t.signOffDocument === 'no' ? '' : t.signOffDocument || '');
      return dataRow;
    });

    const allRows = [headerRow, ...dataRows];
    const csvContent = allRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'application.csv';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setShowFilter(false);
    }

    if (columnRef.current && !columnRef.current.contains(event.target)) {
      setShowColumns(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='table_main'>
      {modal}
      <Announcement />

      <div className='application_main'>

        <div className='heading'>
          <h5>APPLICATIONS</h5>

          <div className='search_tables'>
            <div className='searching' ref={buttonRef}>
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
                    {['referenceNo', 'serialNo', 'cdaSerialNo', 'fullName', 'plot'].map((fieldName) => (
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

            <div className='filteration' ref={columnRef}>
              <span onClick={() => setShowColumns(!showColumns)}><p style={{ width: "80px" }}>Columns</p>
              <FiColumns /></span>

              {
                showColumns &&
                <div className='filter_checkboxes'>
                  <div key={`inline-checkbox`}>
                    {Object.keys(showingFields).map((field) => (
                      <Form.Check
                        key={field}
                        inline
                        label={field}
                        checked={showingFields[field]}
                        onChange={(e) =>
                          setShowingFields((prevFields) => ({
                            ...prevFields,
                            [field]: e.target.checked
                          }))
                        }
                        name="group1"
                        type={'checkbox'}
                      />
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <div className='download_csv'>
          <button onClick={downloadCSV}><MdOutlineFileDownload style={{ fontSize: "18px" }} /> Download CSV</button>
        </div>

        {
          loading ? <div className='py-3'>
            <Loader />
          </div> :
            <div className='application_table'>
              <Table responsive>
                <thead style={{ borderTop: "1px solid lightgray" }}>
                  <tr>
                    {Object.keys(showingFields).map((field) => (
                      showingFields[field] && (
                        <th key={field} style={{ width: getColumnWidth(field), paddingLeft: getPaddingLeft(field) }}>
                          {getFieldLabel(field)}
                        </th>
                      )
                    ))}
                    <th className='text-center'>View Download</th>
                    <th className='text-center' style={{ paddingRight: "15px", width: "80px" }}>SignOff Upload / Download</th>
                  </tr>
                </thead>
                {
                  getTableData?.length > 0 &&
                  <tbody>
                    {currentItems}
                  </tbody>
                }
              </Table>
              {getTableData?.length === 0 && <p className='text-center' style={{ fontWeight: "600" }}>No Data Found</p>}

              {
                getTableData?.length > 0 &&
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
              }
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