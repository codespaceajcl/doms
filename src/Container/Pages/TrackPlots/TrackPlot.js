import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { MdOutlineRemoveRedEye, MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { applicationGet, tractPlotGet } from '../../../Redux/Action/Dashboard';
import Loader from '../../../Utils/Loader';
import { getCurrentUser } from '../../../Utils/Helper';
import { MdClose } from "react-icons/md";
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import Announcement from '../../../Components/Announcement/Announcement';
import { Form, Modal } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import './TrackPlots.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const TrackPlots = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [searchNo, setSearchNo] = useState('')
    const [getTableData, setGetTableData] = useState([])
    const [previewPdf, setPreviewPdf] = useState('')
    const [showHistory, setShowHistory] = useState(false)
    const [showPdf, setShowPdf] = useState(false)
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const { loading, tableGetData } = useSelector((state) => state.getTable)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }

    useEffect(() => {
        const currentUser = getCurrentUser();
        const formData = new FormData();
        formData.append("token", currentUser?.token)
        formData.append("email", currentUser?.email)

        dispatch(applicationGet(formData))
        dispatch(tractPlotGet(formData))

    }, [])

    useEffect(() => {
        setGetTableData(tableGetData?.data)
    }, [tableGetData])

    const searchHandler = () => {

        if (searchNo?.length === 0) {
            setGetTableData(tableGetData?.data);
            return
        }

        const filteredData = tableGetData?.data?.filter((t) => t.plot === searchNo);
        setGetTableData(filteredData);
    };

    const previewHandler = (getDoc) => {
        setPreviewPdf(getDoc)
        setShowHistory(true)
    }

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        // You can perform additional actions with the selected file if needed
    };

    const handleIconClick = () => {
        // Trigger the file input when the icon is clicked
        document.getElementById('fileInput').click();
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = getTableData?.slice(offset, offset + itemsPerPage).map((t, i) => {
        return (
            <tr>
                <td>{t?.referenceNo}</td>
                <td>{t?.serialNo}</td>
                <td>{t?.cdaSerialNo}</td>
                <td>{t?.address}</td>
                <td>{t?.street}</td>
                <td>{t?.sector}</td>
                <td>{t?.plot}</td>
                <td>{t?.fullName} {t?.fatherName}</td>
                <td style={{ color: "#5454d8", textAlign: "center", cursor: "pointer" }}> <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                /> <MdOutlineFileUpload onClick={handleIconClick} /></td>
                <td className='text-center'>
                    <span style={{ color: "#299205", marginRight: "5px" }}><MdOutlineRemoveRedEye onClick={t.document ? () => previewHandler(t.document) : null} /></span>
                    <span> <a style={{ textDecoration: "none" }} href={t.document ? t.document : null} target='_blank'>
                        <MdOutlineFileDownload /> </a> </span>
                </td>
            </tr>
        )
    });

    const modal = <Modal size='xl' className='history_modal' centered show={showHistory} onHide={() => setShowHistory(!showHistory)}>
        <Modal.Body>
            <div className='head'>
                <h3>plot transfer history</h3>
                <IoMdClose onClick={() => setShowHistory(!showHistory)} />
            </div>

            <div className='content'>
                {
                    loading ? <div className='py-3'>
                        <Loader />
                    </div> :
                        <div className='application_table mt-0'>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>serial No</th>
                                        <th>reference No</th>
                                        <th>Owner Name</th>
                                        <th>Transfer Date</th>
                                        <th>Transfer To</th>
                                        <th>Plot Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>RF001</td>
                                        <td>CDA/DLR/(1022)I-12/1/110</td>
                                        <td>Fida Muhammad Khan</td>
                                        <td>10-Sep-1985</td>
                                        <td>Mr. Sher Khan</td>
                                        <td>I-12/6 ISLAMABAD</td>
                                    </tr>
                                    <tr>
                                        <td>RF001</td>
                                        <td>CDA/DLR/(1022)I-12/1/110</td>
                                        <td>Fida Muhammad Khan</td>
                                        <td>10-Sep-1985</td>
                                        <td>Mr. Sher Khan</td>
                                        <td>I-12/6 ISLAMABAD</td>
                                    </tr>
                                    <tr>
                                        <td>RF001</td>
                                        <td>CDA/DLR/(1022)I-12/1/110</td>
                                        <td>Fida Muhammad Khan</td>
                                        <td>10-Sep-1985</td>
                                        <td>Mr. Sher Khan</td>
                                        <td>I-12/6 ISLAMABAD</td>
                                    </tr>
                                    <tr>
                                        <td>RF001</td>
                                        <td>CDA/DLR/(1022)I-12/1/110</td>
                                        <td>Fida Muhammad Khan</td>
                                        <td>10-Sep-1985</td>
                                        <td>Mr. Sher Khan</td>
                                        <td>I-12/6 ISLAMABAD</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                }
            </div>
        </Modal.Body>
    </Modal>

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
            {modal}
            <Announcement />

            <div className='application_main'>

                <div className='heading plot_head'>
                    <h5>TRACK PLOTS</h5>
                </div>

                <div className='plot_table'>
                    <div className='plot_search'>
                        <input
                            placeholder='Search by Plot No.'
                            value={searchNo}
                            name="searchNo"
                            onChange={(e) => setSearchNo(e.target.value)}
                        />
                        <svg onClick={searchHandler} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none">
                            <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#787878" />
                        </svg>
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
                                        <th style={{ width: "100px" }}>Ref No.</th>
                                        <th>Doc. Serial No.</th>
                                        <th>CDA Serial No.</th>
                                        <th style={{ width: "130px" }}>Address</th>
                                        <th style={{ width: "80px" }}>Street</th>
                                        <th>Sector</th>
                                        <th>Plot No.</th>
                                        <th style={{ width: "120px" }}>Owner Name</th>
                                        <th>Upload</th>
                                        <th className='text-center'>View Download</th>
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

export default TrackPlots
