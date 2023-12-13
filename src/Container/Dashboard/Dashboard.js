import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Announcement from '../../Components/Announcement/Announcement'
import { chartStyle, getCurrentUser } from '../../Utils/Helper';
import { applicationGet, dashboardGet } from '../../Redux/Action/Dashboard';
import Loader from '../../Utils/Loader';
import {
  Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
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
  const heightRef = useRef();
  const buttonRef = useRef(null);

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
  // const [showStateData, setShowStateData] = useState([])
  const [showCityData, setShowCityData] = useState([])

  const { loading, tableGetData } = useSelector((state) => state.getTable)
  const { loading: dashboardLoading, dashGetData } = useSelector((state) => state.getDashboard)

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

  // const generateColors = (numColors) => {
  //   const colors = [];
  //   for (let i = 0; i < numColors; i++) {
  //     const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  //     colors.push(color);
  //   }
  //   return colors;
  // };

  // const dataLength = dashGetData?.data?.documentsByCity?.length || 0;
  // const dynamicColors = generateColors(dataLength);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // const warehouseOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //       position: 'top',
  //     },
  //     title: {
  //       display: false,
  //       text: '',
  //     },
  //   },
  //   scales: {
  //     x: {
  //       grid: {
  //         color: '#F7F9FB',
  //       }
  //     },
  //     y: {
  //       grid: {
  //         color: '#e8e8e8',
  //       }
  //     },
  //   },
  // };

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

  // const stateOptions = dashGetData ? dashGetData?.data?.documentsByState?.reduce((uniqueCountries, c) => {
  //   if (!uniqueCountries?.has(c.country)) {
  //     uniqueCountries?.add(c?.country);
  //     return uniqueCountries;
  //   }
  //   return uniqueCountries;
  // }, new Set()) : []

  // const stateOptionsArray = stateOptions ? Array.from(stateOptions).map(country => ({ value: country, label: country })) : []

  const cityOptions = dashGetData ? dashGetData?.data?.documentsBySector?.reduce((uniqueCountries, c) => {
    if (!uniqueCountries?.has(c.city)) {
      uniqueCountries?.add(c.city);
      return uniqueCountries;
    }
    return uniqueCountries;
  }, new Set()) : []

  const cityOptionsArray = cityOptions ? Array.from(cityOptions).map(country => ({ value: country, label: country })) : []

  // const [stateOption, setStateOption] = useState({ value: "Pakistan", label: "Pakistan" })
  const [cityOption, setCityOption] = useState({ value: "Islamabad", label: "Islamabad" })

  // const warehouseData = {
  //   labels: showStateData?.map((s) => (s?.state)),
  //   datasets: [
  //     {
  //       label: '',
  //       data: showStateData?.map((s) => (s?.count)),
  //       backgroundColor: ['#95A4FC', '#BAEDBD', '#1C1C1C', '#B1E3FF', '#A8C5DA', '#A1E3CB'],
  //       barThickness: 20,
  //     },
  //   ],
  // };

  const capacityData = {
    labels: showCityData?.map((s) => (`${s?.city}`)),
    datasets: [
      {
        label: '',
        data: showCityData?.map((s) => (s?.count)),
        backgroundColor: ["#1c1c1c", "#95a4fc", "#b1e3ff", "#baedbd"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {

    const filteredArrCity = dashGetData ? dashGetData?.data?.documentsBySector?.filter(item => item?.city === cityOption?.value) : []
    const result = filteredArrCity?.map(item => ({ city: item?.sector, count: item?.count }));
    setShowCityData(result)

  }, [dashGetData, cityOption])

  // useEffect(() => {

  //   const filteredArr = dashGetData ? dashGetData?.data?.documentsByState?.filter(item => item?.country === stateOption?.value) : []
  //   const result = filteredArr?.map(item => ({ state: item?.state, count: item?.count }));
  //   setShowStateData(result)

  // }, [dashGetData, stateOption])

  useEffect(() => {
    const updateTableScrollHeight = () => {
      const tableScroll = document.querySelector('.table_scroll');
      const mainCharts = document.querySelector('.main_charts');

      if (tableScroll && mainCharts) {
        const newHeight = `${mainCharts.clientHeight - 58}px`;
        tableScroll.style.height = newHeight;
      }
    };

    const resizeObserver = new ResizeObserver(updateTableScrollHeight);
    const mainCharts = document.querySelector('.main_charts');
    if (mainCharts) {
      resizeObserver.observe(mainCharts);
    }

    return () => {
      if (mainCharts) {
        resizeObserver.unobserve(mainCharts);
      }
    };
  }, []);

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setShowFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
        text: '',
      },
    },

  };

  const labels = dashGetData?.data?.dateWiseTrend?.sort((a, b) => a.date - b.date)?.map((t) => t?.date)

  const lineData = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: '',
        data: dashGetData?.data?.dateWiseTrend?.sort((a, b) => a.date - b.date)?.map((d) => d.quantity),
        borderColor: '#739B21',
        backgroundColor: '#739b2175',
      },
    ],
  };

  return (
    <div>
      <Announcement />

      <div className='dashboard_main'>
        <Row style={{ padding: "0 15px", gap: "15px 0" }}>
          <Col md={3} sm={6} xs={6}>
            <div className='dashboard_boxes'>
              <h6>Total <br /> Applications</h6>
              <h5>{loading ? 0 : dashGetData?.data?.totalApplications}</h5>
            </div>
          </Col>
          <Col md={3} sm={6} xs={6}>
            <div className='dashboard_boxes'>
              <h6>Applicants This <br /> Month</h6>
              <h5>{loading ? 0 : dashGetData?.data?.applicationsThisMonth}</h5>
            </div>
          </Col>
          <Col md={3} sm={6} xs={6}>
            <div className='dashboard_boxes'>
              <h6>Total No. of <br /> Sectors</h6>
              <h5>{loading ? 0 : dashGetData?.data?.totalSectors}</h5>
            </div>
          </Col>
          <Col md={3} sm={6} xs={6}>
            <div className='dashboard_boxes'>
              <h6>Total No. of <br /> Plots</h6>
              <h5>{loading ? 0 : dashGetData?.data?.totalPlots}</h5>
            </div>
          </Col>
        </Row>

        <Row style={{ padding: "0 15px" }}>
          <Col md={6}>
            <div className='application_table recent_table'>
              <div className='heading'>
                <h6>Recent Uploads</h6>

                <div className='search_tables'>
                  <div className='searching' ref={buttonRef}>
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
                  <div className='table_scroll' style={{ height: heightRef.current && `${heightRef.current.clientHeight - 58}px`, overflowY: "scroll" }}>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th style={{ paddingLeft: "12px", width: "100px" }}>reference no</th>
                          <th>full name</th>
                          <th style={{ width: "85px" }}>Serial No</th>
                          <th style={{ width: "70px" }} className='text-center'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          getTableData?.map((t) => {
                            return (
                              <tr key={t?.id}>
                                <td style={{ paddingLeft: "12px", width: "100px" }}>{t?.referenceNo}</td>
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
                  </div>
              }
            </div>
          </Col>
          <Col md={6}>
            <div className='main_charts' ref={heightRef}>
              <div className='dashboard_chart'>
                <div style={{ padding: "15px" }}>
                  <div className='show_state_div'>
                    <h6>Applications Date Wise</h6>
                    {/* <Select options={stateOptionsArray} value={stateOption} onChange={(state) => setStateOption(state)} placeholder="Select State" styles={chartStyle} /> */}
                  </div>

                  {
                    dashboardLoading ? <div className='py-5'> <Loader /> </div> :
                      <div className='line_chart'>
                        <Line options={lineOptions} data={lineData} />
                        {/* <Bar options={warehouseOptions} data={warehouseData} /> */}
                      </div>
                  }
                </div>
              </div>

              <div className='dashboard_chart'>
                <div style={{ padding: "15px" }}>
                  <div className='show_state_div'>
                    <h6>Applications City Wise</h6>
                    <Select options={cityOptionsArray} value={cityOption} onChange={(state) => setCityOption(state)} placeholder="Select State" styles={chartStyle} />
                  </div>
                  {
                    dashboardLoading ? <div className='py-5'> <Loader /> </div> :
                      <div className='zone_wise'>
                        <div className='donut_chart'>
                          <Doughnut data={capacityData} options={options} />
                        </div>
                        <div>
                          <ul>
                            {
                              showCityData?.map((s) => {
                                return (
                                  <li><div> <span>{s.city}</span>  {s.count} </div></li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      </div>
                  }
                </div>
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
