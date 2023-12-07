import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Announcement from '../../Components/Announcement/Announcement'
import { getCurrentUser } from '../../Utils/Helper';
import { applicationGet, dashboardGet } from '../../Redux/Action/Dashboard';
import Loader from '../../Utils/Loader';
import {
  Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Document, Page, pdfjs } from 'react-pdf';
import { MdOutlineRemoveRedEye, MdOutlineFileDownload, MdClose } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import './Dashboard.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showPdf, setShowPdf] = useState(false)
  const [previewPdf, setPreviewPdf] = useState('')
  const [getTableData, setGetTableData] = useState([])
  const [searchNo, setSearchNo] = useState('')
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, tableGetData } = useSelector((state) => state.getTable)
  const { loading: dashLoading, dashGetData } = useSelector((state) => state.getDashboard)

  console.log(dashGetData)

  useEffect(() => {
    const currentUser = getCurrentUser();
    const formData = new FormData();
    formData.append("token", currentUser?.token)
    formData.append("email", currentUser?.email)

    dispatch(dashboardGet(formData))
  }, [])

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

  const searchHandler = () => {
    const filteredData = tableGetData?.data?.filter((t) =>
      t.referenceNo.toLowerCase().includes(searchNo.toLowerCase())
    );

    setGetTableData(filteredData)
  }

  const previewHandler = (getDoc) => {
    setPreviewPdf(getDoc)
    setShowPdf(true)
  }

  const capacityData = {
    labels: ['38% Zone I', '21% Zone II', '22% Zone III', '30% Zone IV', '8% Zone V'],
    datasets: [
      {
        label: '',
        data: [38, 21, 22, 30, 8],
        backgroundColor: [
          '#1c1c1c',
          '#739b21',
          '#baedbd',
          '#95a4fc',
          '#b1e3ff'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const warehouseOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
    },
    scales: {
      x: {
        grid: {
          color: '#F7F9FB',
        }
      },
      y: {
        grid: {
          color: '#e8e8e8',
        }
      },
    },
  };

  const warehouseLabels = [
    'UC - 1',
    'UC - 2',
    'UC - 3',
    'UC - 4',
    'UC - 5',
    'UC - 6',
  ];

  const warehouseData = {
    labels: warehouseLabels,
    datasets: [
      {
        label: '',
        data: [50, 75, 30, 60, 75, 60],
        backgroundColor: [
          '#95A4FC',
          '#BAEDBD',
          '#1C1C1C',
          '#B1E3FF',
          '#A8C5DA',
          '#A1E3CB',
        ],
        barThickness: 20,
      },
    ],
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
    <div>
      <Announcement />

      <div className='dashboard_main'>
        <Row style={{ padding: "0 15px" }}>
          <Col md={3}>
            <div className='dashboard_boxes'>
              <h6>Total <br /> Applications</h6>
              <h5>{loading ? 0 : dashGetData?.data?.totalApplications}</h5>
            </div>
          </Col>
          <Col md={3}>
            <div className='dashboard_boxes'>
              <h6>Applicants This <br /> Month</h6>
              <h5>{loading ? 0 : dashGetData?.data?.applicationsThisMonth}</h5>
            </div>
          </Col>
          <Col md={3}>
            <div className='dashboard_boxes'>
              <h6>Total Registered <br /> Users</h6>
              <h5>{loading ? 0 : dashGetData?.data?.totalRegisteredUsers}</h5>
            </div>
          </Col>
          <Col md={3}>
            <div className='dashboard_boxes'>
              <h6>Active Users This <br /> Month</h6>
              <h5>{loading ? 0 : dashGetData?.data?.activeUsersThisMonth}</h5>
            </div>
          </Col>
        </Row>

        <Row style={{ padding: "0 15px" }}>
          <Col md={6}>
            <div className='application_table recent_table'>
              <div className='heading'>
                <h6>Recent Uploads</h6>

                <div className='search_tables'>
                  <div>
                    <input placeholder='Reference No' value={searchNo} name="searchNo" onChange={(e) => setSearchNo(e.target.value)} />
                    <svg onClick={searchHandler} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none">
                      <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#787878" />
                    </svg>
                  </div>
                </div>
              </div>

              {
                loading ? <div className='py-3'> <Loader /> </div> :
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>reference no</th>
                        <th>full name</th>
                        <th style={{ width: "85px" }}>Serial No</th>
                        <th style={{ width: "70px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        getTableData?.map((t, i) => {
                          return (
                            <tr>
                              <td>{t?.referenceNo}</td>
                              <td>{t?.fullName}</td>
                              <td className='text-center'>{t?.serialNo}</td>
                              <td className='text-center'>
                                <span style={{ color: "#299205", marginRight: "5px" }}><MdOutlineRemoveRedEye onClick={t.document ? () => previewHandler(t.document) : null} /></span>
                                <span> <a style={{ textDecoration: "none" }} href={t.document ? t.document : null} target='_blank'>
                                  <MdOutlineFileDownload /> </a> </span>
                              </td>

                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
              }
            </div>
          </Col>
          <Col md={6}>
            <div className='dashboard_chart'>
              <div style={{ padding: "15px" }}>
                <h6>Applications Zones Wise (Islamabad)</h6>

                <div className='zone_wise'>
                  <div className='donut_chart'>
                    <Doughnut data={capacityData} options={options} />
                  </div>
                  <div>
                    <ul>
                      <li><div> <span>Zone I</span>  38.6% </div></li>
                      <li><div> <span>Zone II</span>  21.6% </div></li>
                      <li><div> <span>Zone III</span>  22.5% </div></li>
                      <li><div> <span>Zone IV</span>  30.8% </div></li>
                      <li style={{ paddingBottom: "0" }}><div> <span>Zone V</span>  8.1% </div></li>
                    </ul>
                  </div>

                </div>
              </div>

              <div style={{ padding: "15px" }}>
                <h6>Applicantions by Area  Union District (Islamabad)</h6>

                <div className='line_chart'>
                  <Bar options={warehouseOptions} data={warehouseData} />
                </div>
              </div>

              <div className='overlay_coming_soon'>
                <h2>COMMING SOON</h2>
              </div>
            </div>
          </Col>
        </Row>

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

export default Dashboard
