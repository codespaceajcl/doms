import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { applicationGet, tractPlotGet } from '../../../Redux/Action/Dashboard';
import Loader from '../../../Utils/Loader';
import { getCurrentUser } from '../../../Utils/Helper';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import Announcement from '../../../Components/Announcement/Announcement';
import { Form, Modal } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import './TrackPlots.css';

const TrackPlots = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [searchNo, setSearchNo] = useState('')
    const [getTableData, setGetTableData] = useState([])
    const [previewPdf, setPreviewPdf] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const [selectedFields, setSelectedFields] = useState([
        'referenceNo',
        'fullName',
        'serialNo',
        'cdaSerialNo',
        'date',
        'videOrderDate',
    ]);
    const [showHistory, setShowHistory] = useState(false)

    const { loading, tableGetData } = useSelector((state) => state.getTable)

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
        setShowHistory(true)
    }

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

    return (
        <div className='table_main'>
            {modal}
            <Announcement />

            <div className='application_main'>

                <div className='heading'>
                    <h5>TRACK PLOTS</h5>

                    <div className='search_tables'>
                        <div className='searching'>
                            <input
                                className='search_no'
                                placeholder='Search'
                                value={searchNo}
                                name="searchNo"
                                onChange={searchHandler}
                            />
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
                                        <th>View History</th>
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
            </div>
        </div>
    )
}

export default TrackPlots
