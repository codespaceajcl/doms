import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Announcement from '../../Components/Announcement/Announcement'
import { chartStyle, dashboardColorStyles, getCurrentUser } from '../../Utils/Helper';
import { applicationGet, dashboardGet } from '../../Redux/Action/Dashboard';
import Loader from '../../Utils/Loader';
import {
  Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Document, Page, pdfjs } from 'react-pdf';
import { MdOutlineRemoveRedEye, MdOutlineFileDownload, MdClose } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Select from "react-select";
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
  const [showFilter, setShowFilter] = useState(false)
  const [selectedFields, setSelectedFields] = useState([
    'referenceNo',
    'fullName',
    'serialNo',
  ]);

  const { loading, tableGetData } = useSelector((state) => state.getTable)
  const { dashGetData } = useSelector((state) => state.getDashboard)

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

  const stateOptions = [
    { value: "Islamabad", label: "Islamabad" },
    { value: "Karachi", label: "Karachi" },
    { value: "Lahore", label: "Lahore" },
    { value: "Quetta", label: "Quetta" },
  ]

  const cityOptions = [
    { value: "Punjab", label: "Punjab" },
    { value: "Sindh", label: "Sindh" },
    { value: "Balochistan", label: "Balochistan" },
    { value: "KPK", label: "KPK" },
  ]

  const [stateOption, setStateOption] = useState(stateOptions[0])
  const [cityOption, setCityOption] = useState(cityOptions[0])


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
              <h6>Total No. of <br /> Sectors</h6>
              <h5>{loading ? 0 : dashGetData?.data?.totalRegisteredUsers}</h5>
            </div>
          </Col>
          <Col md={3}>
            <div className='dashboard_boxes'>
              <h6>Total No. of <br /> Plots</h6>
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
                  <div className='searching'>
                    <input
                      className='recent_search'
                      placeholder='Search'
                      value={searchNo}
                      name="searchNo"
                      onChange={searchHandler}
                    />
                    <svg onClick={() => setShowFilter(!showFilter)} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <mask id="mask0_351_738" style={{ maskType: "alpha", cursor: "pointer" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
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
                          {['referenceNo', 'fullName', 'serialNo'].map((fieldName) => (
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
            <div className='main_charts'>
              <div className='dashboard_chart'>
                <div style={{ padding: "15px" }}>
                  <div className='show_state_div'>
                    <h6>Applicantions by State</h6>

                    <Select options={stateOptions} value={stateOption} onChange={(state) => setStateOption(state)} placeholder="Select State" styles={chartStyle} />
                  </div>

                  <div className='line_chart'>
                    <Bar options={warehouseOptions} data={warehouseData} />
                  </div>
                </div>
              </div>

              <div className='dashboard_chart'>
                <div style={{ padding: "15px" }}>
                  <div className='show_state_div'>
                    <h6>Applications City Wise</h6>

                    <Select options={cityOptions} value={cityOption} onChange={(state) => setCityOption(state)} placeholder="Select State" styles={chartStyle} />
                  </div>

                  <div className='zone_wise'>
                    <div className='donut_chart'>
                      <Doughnut data={capacityData} options={options} />
                    </div>
                    <div>
                      <ul>
                        <li><div> <span>Lahore</span>  38.6% </div></li>
                        <li><div> <span>Islamabad</span>  21.6% </div></li>
                        <li><div> <span>Faislabad</span>  22.5% </div></li>
                        <li><div> <span>Multan</span>  30.8% </div></li>
                        <li style={{ paddingBottom: "0" }}><div> <span>Others</span>  8.1% </div></li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>

              <div className='overlay_coming_soon'>
                <h2>COMING SOON</h2>
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
