import React, { useEffect, useRef, useState } from 'react'
import { Col, Row, Form, Spinner, Modal } from 'react-bootstrap';
import { MdClose } from "react-icons/md";
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { errorNotify, successNotify } from '../../../Utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { FormCreate, FormSave } from '../../../Redux/Action/Dashboard';
import Select from "react-select"
import { Document, Page, pdfjs } from 'react-pdf';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Loader from '../../../Utils/Loader';
import Announcement from '../../../Components/Announcement/Announcement';
import defaultImg from "../../../images/default_image.png";
import { dashboardColorStyles } from '../../../Utils/Helper';
import { encryptWithRSA } from "../../../Components/Encryption/Encryption";
import { decryptWithRSA } from '../../../Components/Decryption/Decryption';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user"))

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [previewPdf, setPreviewPdf] = useState('')
  const [tab, setTab] = useState('registration');
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [no_attachment, setNo_attachment] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [attachmentData, setAttachmentData] = useState([]);
  const [attachmentDataPreview, setAttachmentDataPreview] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { loading, formCreateData } = useSelector((state) => state.postForm)
  const { loading: saveLoading, formSaveData, error } = useSelector((state) => state.saveForm)

  useEffect(() => {
    return () => {
      setTab('registration')

      setFormField({
        referenceNo: "",
        serialNo: "",
        date: '2023-01-01',
        fullName: "",
        fatherName: "",
        address: "",
        cdaSerialNo: "",
        videOrderDate: "2023-01-01",
        plot: "",
        street: "",
        sector: "",
        plotSize: ""
      })
      setProfileImage(null)
      setProfileImagePreview(null)
      setPreviewPdf('')
      setNumPages()
      setPageNumber(1)
      // setPrintLink('')
      // setPrintLoader(false)
      // setShowPrintOnce(false)
      setNo_attachment(null)
      setAttachments([])
      setAttachmentData([])
      setAttachmentDataPreview([])
      setCountryOption(options[0])
      setStateOption({ value: "Punjab", label: "Punjab" })
      setCityOptions([])
      setCityOption({ value: "Islamabad", label: "Islamabad" })
      setFileIndex(null)
    }
  }, [])

  useEffect(() => {
    if (formCreateData?.response === 'success') {
      setPreviewPdf(formCreateData?.link)
      // setPreviewPdf(testPdf)
      dispatch({ type: "FORM_POST_RESET" })
    }
    else if (formCreateData?.response === 'error') {
      errorNotify(formCreateData?.message)
      setTab("registration")
      dispatch({ type: "FORM_POST_RESET" })
    }
  }, [formCreateData])

  useEffect(() => {
    if (formSaveData?.response === 'success') {
      setTab('submit')
      // setPrintLink(formSaveData?.link)
      dispatch({ type: "FORM_SAVE_RESET" })
      setPreviewPdf('')
      successNotify("Application Added Successfully!")
    }
    else if(formSaveData?.response === 'error'){
      errorNotify(formSaveData?.message)
      setTab("registration")
      setPreviewPdf('')
      dispatch({ type: "FORM_SAVE_RESET" })
    }
  }, [formSaveData])

  const options = [
    { value: "Pakistan", label: "Pakistan" }
  ]

  const stateOptions = [
    { value: "Sindh", label: "Sindh" },
    { value: "Punjab", label: "Punjab" },
    { value: "Khyber_Pakhtunkhwa", label: "Khyber Pakhtunkhwa" },
    { value: "Balochistan", label: "Balochistan" },
  ]

  const cities = [
    {
      state: "Sindh",
      city: [{ value: "Karachi", label: "Karachi" }, { value: "Hyderabad", label: "Hyderabad" }, { value: "Jamshoro", label: "Jamshoro" }, { value: "Tatta", label: "Tatta" }, { value: "Larkana", label: "Larkana" }, { value: "Ghotki", label: "Ghotki" }, { value: "Nawab Shah", label: "Nawab Shah" }]
    },
    {
      state: "Punjab",
      city: [{ value: "Islamabad", label: "Islamabad" }, { value: "Lahore", label: "Lahore" }, { value: "Sahiwal", label: "Sahiwal" }, { value: "Faisalabad", label: "Faisalabad" }, { value: "Sialkot", label: "Sialkot" }, { value: "Jhelum", label: "Jhelum" }, { value: "Sargodha", label: "Sargodha" }]
    },
    {
      state: "Khyber_Pakhtunkhwa",
      city: [{ value: "Peshawar", label: "Peshawar" }, { value: "Nowshera", label: "Nowshera" }, { value: "Abbottabad", label: "Abbottabad" }, { value: "Chitral", label: "Chitral" }, { value: "Chārsadda", label: "Chārsadda" }]
    },
    {
      state: "Khyber_Pakhtunkhwa",
      city: [{ value: "Quetta", label: "Quetta" }, { value: "Gwadar", label: "Gwadar" }, { value: "Turbat", label: "Turbat" }, { value: "Khuzdar", label: "Khuzdar" }, { value: "Noshki", label: "Noshki" }, { value: "Chaman", label: "Chaman" }]
    },
  ]

  const [formField, setFormField] = useState({
    referenceNo: "",
    serialNo: "",
    date: '2023-01-01',
    fullName: "",
    fatherName: "",
    address: "",
    cdaSerialNo: "",
    videOrderDate: "2023-01-01",
    plot: "",
    street: "",
    sector: "",
    plotSize: ""
  })

  const [countryOption, setCountryOption] = useState(options[0]);
  const [stateOption, setStateOption] = useState({ value: "Punjab", label: "Punjab" });
  const [cityOptions, setCityOptions] = useState([]);
  const [cityOption, setCityOption] = useState({ value: "Islamabad", label: "Islamabad" });
  const [fileIndex, setFileIndex] = useState(null)

  useEffect(() => {
    const selectedStateCities = cities?.find((item) => item.state === stateOption.value);
    const cityPresent = selectedStateCities?.city.find((c) => c.value === cityOption.value)
    setCityOptions(selectedStateCities ? selectedStateCities?.city : []);
    setCityOption(cityPresent ? { value: cityOption.value, label: cityOption.value } : null)
  }, [stateOption])

  const handleStateChange = (selectedState) => {
    setStateOption(selectedState);

    const selectedStateCities = cities.find((item) => (item.state === selectedState.value) || (item.state === stateOption.value));
    setCityOptions(selectedStateCities ? selectedStateCities.city : []);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;

        setProfileImage(base64String);
        setProfileImagePreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleDocClick = (i) => {
    docInputRef.current.click();
    setFileIndex(i)
  };

  const formFieldHandler = (e) => {
    const { name, value } = e.target;

    setFormField((prevFormFields) => ({
      ...prevFormFields,
      [name]: value,
    }));
  };

  const previewHandler = () => {

    const isAttachmentDataValid = attachmentData.every((attachment) => {
      const descriptionKey = Object.keys(attachment).find(key => key.includes('Description'));
      const documentKey = Object.keys(attachment).find(key => key.includes('Document'));

      const description = attachment[descriptionKey];
      const document = attachment[documentKey];

      return description && document;
    });

    const isAnyFieldEmpty = Object.values(formField).some(value => value === "");
    if (!isAttachmentDataValid || isAnyFieldEmpty || !profileImage || stateOption.length === 0 || cityOption.length === 0) {
      errorNotify("Please Filled up all fields");
      return;
    }

    const registerData = new FormData();

    for (const key in formField) {
      if (formField.hasOwnProperty(key)) {
        if (key !== 'serialNo') {
          let encryptedValue = encryptWithRSA(formField[key]);
          registerData.append(key, encryptedValue);
        }
      }
    }

    registerData.append("serialNo", formField.serialNo)
    registerData.append("profile", profileImage)

    const encryptedCountry = encryptWithRSA(countryOption.value);
    registerData.append("country", encryptedCountry)

    const encryptedState = encryptWithRSA(stateOption.value);
    registerData.append("state", encryptedState)

    const encryptedCity = encryptWithRSA(cityOption.value);
    registerData.append("city", encryptedCity)

    registerData.append("token", currentUser.token)
    registerData.append("email", currentUser.email)

    setTab('preview')
    dispatch(FormCreate(registerData))
  }

  const saveFormHandler = () => {
    const isAttachmentDataValid = attachmentData.every((attachment) => {
      const descriptionKey = Object.keys(attachment).find(key => key.includes('Description'));
      const documentKey = Object.keys(attachment).find(key => key.includes('Document'));

      const description = attachment[descriptionKey];
      const document = attachment[documentKey];

      return description && document;
    });

    const isAnyFieldEmpty = Object.values(formField).some(value => value === "");
    if (!isAttachmentDataValid || isAnyFieldEmpty || !profileImage || stateOption.length === 0 || cityOption.length === 0) {
      errorNotify("Please Filled up all fields");
      return;
    }

    const registerData = new FormData();

    for (const key in formField) {
      if (formField.hasOwnProperty(key)) {
        if (key !== 'serialNo') {
          let encryptedValue = encryptWithRSA(formField[key]);
          registerData.append(key, encryptedValue);
        }
      }
    }

    registerData.append("serialNo", formField.serialNo)

    registerData.append("profile", profileImage)

    const encryptedCountry = encryptWithRSA(countryOption.value);
    registerData.append("country", encryptedCountry)

    const encryptedState = encryptWithRSA(stateOption.value);
    registerData.append("state", encryptedState)

    const encryptedCity = encryptWithRSA(cityOption.value);
    registerData.append("city", encryptedCity)

    registerData.append("noOfAttachments", no_attachment)

    attachmentData.forEach((attachment, index) => {
      const documentKey = `attachment${index + 1}Document`;
      const descriptionKey = `attachment${index + 1}Description`;

      registerData.append(documentKey, attachment[documentKey]);
      registerData.append(descriptionKey, attachment[descriptionKey]);
    });

    registerData.append("email", currentUser.email)
    registerData.append("token", currentUser.token)

    dispatch(FormSave(registerData))

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

  const handleNoAttachmentsChange = (e) => {
    let value = parseInt(e.target.value);
    value = Math.min(Math.max(value, 1), 20);

    setNo_attachment(value);
    setAttachments(Array.from({ length: value }, (_, index) => index));

    const newAttachmentData = Array.from({ length: value }, (_, index) => ({
      [`attachment${index + 1}Document`]: null,
      [`attachment${index + 1}Description`]: '',
    }));
    setAttachmentData(newAttachmentData);

    const newAttachmentDataPreview = Array.from({ length: value }, (_, index) => ({
      [`attachment${index + 1}Document`]: null,
      [`attachment${index + 1}Preview`]: null,
    }));

    setAttachmentDataPreview(newAttachmentDataPreview);
  };

  const handleAttachmentTextChange = (index, field, value) => {
    setAttachmentData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][field] = value;
      return updatedData;
    });
  };

  const handleAttachmentFileChange = (index, field, file) => {
    const allowedFileTypes = ['png', 'jpg', 'jpeg', 'pdf'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedFileTypes.includes(fileExtension)) {
      errorNotify("Invalid file type. Only png, jpg, jpeg, and pdf are allowed.");
      return;
    }
    setAttachmentData((prevData) => {
      const updatedData = [...prevData];
      updatedData[fileIndex][`attachment${fileIndex + 1}Document`] = file;
      return updatedData;
    });

    setAttachmentDataPreview((prevData) => {
      const updatedData = [...prevData];
      updatedData[fileIndex][`attachment${fileIndex + 1}Document`] = file.name;
      updatedData[fileIndex][`attachment${fileIndex + 1}Preview`] = URL.createObjectURL(file);
      return updatedData;
    });

    setFileIndex(null)
  };

  const removeHandler = () => {
    setTab('registration')

    setFormField({
      referenceNo: "",
      serialNo: "",
      date: '2023-01-01',
      fullName: "",
      fatherName: "",
      address: "",
      cdaSerialNo: "",
      videOrderDate: "2023-01-01",
      plot: "",
      street: "",
      sector: "",
      plotSize: ""
    })
    setProfileImage(null)
    setProfileImagePreview(null)
    setPreviewPdf('')
    setNumPages()
    setPageNumber(1)
    // setPrintLink('')
    // setPrintLoader(false)
    // setShowPrintOnce(false)
    setNo_attachment(null)
    setAttachments([])
    setAttachmentData([])
    setAttachmentDataPreview([])
    setCountryOption(options[0])
    setStateOption({ value: "Punjab", label: "Punjab" })
    setCityOptions([])
    setCityOption({ value: "Islamabad", label: "Islamabad" })
    setFileIndex(null)
  }

  const modal = <Modal centered className='preview_doc_modal' show={tab === 'preview' ? true : false}>
    <Modal.Body>
      <div className='preview_show' style={{ transition: "all 0.3s ease" }}>
        {
          loading || saveLoading ? <Loader color={"#fff"} /> : previewPdf?.length > 0 ?
            <div className='preview_show_data'>
              <MdClose onClick={() => setTab('registration')} className='close_icon' />

              <Document file={previewPdf} onLoadSuccess={onDocumentLoadSuccess} loading={<div style={{ height: "200px" }}> <Loader color={"#fff"} /> </div>}>
                <Page pageNumber={pageNumber} />
              </Document>

              <div className='pdf_chevron'>
                <FaChevronLeft onClick={pageDecrease} />
                <FaChevronRight onClick={pageIncrease} />
              </div>

              <div className='preview_btn mt-2'>
                <button onClick={saveFormHandler} disabled={saveLoading}> {saveLoading ? <Spinner animation='border' size='sm' /> : "Save"} </button>
                <button className='discard' onClick={() => setTab('registration')}>Discard</button>
              </div>
            </div> : null
        }
      </div>
    </Modal.Body>
  </Modal>

  return (
    <div className='form_main'>
      {modal}
      <Announcement />

      <Row className="justify-content-center">
        <Col md={8}>
          <div className="stepper-wrapper">
            <div className={tab === 'registration' ? "stepper-item completed" : "stepper-item"}>
              <div className="step-counter">1</div>
              <div className="step-name">Registration</div>
            </div>
            <div className={tab === 'preview' ? "stepper-item completed" : "stepper-item"}>
              <div className="step-counter">2</div>
              <div className="step-name">Preview</div>
            </div>
            <div className={tab === 'submit' ? "stepper-item completed" : "stepper-item"}>
              <div className="step-counter">3</div>
              <div className="step-name">Submit</div>
            </div>
          </div>
        </Col>
      </Row>

      <div className='tab_show'>
        {
          (tab === 'registration' || tab === 'preview') && <div className='registration_form'>

            <div className='heading'>
              <h5>REGISTRATION</h5>

              {/* <div>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_328_2926" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_328_2926)">
                      <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="url(#paint0_linear_328_2926)" />
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_328_2926" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#739B21" />
                        <stop offset="1" stop-color="#739B21" />
                      </linearGradient>
                    </defs>
                  </svg>
                  Download Manual</button>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_328_2918" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_328_2918)">
                      <path d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="white" />
                    </g>
                  </svg>
                  Import</button>
              </div> */}
            </div>

            <div className='content'>
              <Row className='align-items-end make_reverse'>
                <Col md={8}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ref No</Form.Label>
                        <Form.Control type="text" placeholder="Enter Reference No"
                          name="referenceNo" value={formField.referenceNo} onChange={formFieldHandler} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Serial No</Form.Label>
                        <Form.Control type="number" minLength={0} placeholder="Enter Serial No" value={formField.serialNo} name='serialNo' onChange={formFieldHandler} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date"
                          name="date" value={formField.date} onChange={formFieldHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className='align-items-end'>
                    <Col md={12}>
                      <div className='edit_profile_img mb-3'>
                        <label className="edit_profile_btn">
                          Upload Profile
                          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <mask id="mask0_328_2954" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                              <rect width="16" height="16" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_328_2954)">
                              <path d="M3.33333 12.6667H4.28333L10.8 6.15L9.85 5.2L3.33333 11.7167V12.6667ZM2 14V11.1667L10.8 2.38333C10.9333 2.26111 11.0806 2.16667 11.2417 2.1C11.4028 2.03333 11.5722 2 11.75 2C11.9278 2 12.1 2.03333 12.2667 2.1C12.4333 2.16667 12.5778 2.26667 12.7 2.4L13.6167 3.33333C13.75 3.45556 13.8472 3.6 13.9083 3.76667C13.9694 3.93333 14 4.1 14 4.26667C14 4.44444 13.9694 4.61389 13.9083 4.775C13.8472 4.93611 13.75 5.08333 13.6167 5.21667L4.83333 14H2ZM10.3167 5.68333L9.85 5.2L10.8 6.15L10.3167 5.68333Z" fill="#787878" />
                            </g>
                          </svg>
                        </label>
                        <div onClick={handleImageClick}>
                          <img src={profileImagePreview ? profileImagePreview : defaultImg} alt='' />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Full Name"
                      name="fullName" value={formField.fullName} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Father Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Father Name"
                      name="fatherName" value={formField.fatherName} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Address"
                      name="address" value={formField.address} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Select options={options} value={countryOption} onChange={(country) => setCountryOption(country)} placeholder="Select Country" styles={dashboardColorStyles} isDisabled />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State/Province</Form.Label>
                    <Select options={stateOptions} value={stateOption}
                      onChange={handleStateChange} placeholder="Select State"
                      styles={dashboardColorStyles} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Select placeholder="Select City" options={cityOptions} value={cityOption}
                      onChange={(state) => setCityOption(state)}
                      styles={dashboardColorStyles} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>CDA Serial No</Form.Label>
                    <Form.Control type="text" placeholder="Enter CDA Serial No"
                      name="cdaSerialNo" value={formField.cdaSerialNo} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Vide Order Date</Form.Label>
                    <Form.Control type="date"
                      name="videOrderDate" value={formField.videOrderDate} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Plot #</Form.Label>
                    <Form.Control type="text" placeholder="Enter Plot Number"
                      name="plot" value={formField.plot} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Street #</Form.Label>
                    <Form.Control type="text" placeholder="Enter Street Number"
                      name="street" value={formField.street} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Sector #</Form.Label>
                    <Form.Control type="text" placeholder="Enter Sector Number"
                      name="sector" value={formField.sector} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Plot Size</Form.Label>
                    <Form.Control type="text" placeholder="Enter Plot Size"
                      name="plotSize" value={formField.plotSize} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>No of Attachments</Form.Label>
                    <Form.Control type="Number" placeholder="Enter No. of Attachments"
                      value={no_attachment} onChange={handleNoAttachmentsChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {
                  attachments.map((index) => (
                    <Col md={4} key={index}>
                      <Form.Group className="mb-3">
                        <Form.Label>{`Attachment ${index + 1} Description & Document`}</Form.Label>
                        <div className='attachment_doc'>
                          <Row>
                            <Col md={8}>
                              <Form.Control as="textarea" placeholder={`Enter Attachment ${index + 1} Description`}
                                onChange={(e) => handleAttachmentTextChange(index, `attachment${index + 1}Description`, e.target.value)} />
                            </Col>
                            <Col md={4} style={{ paddingLeft: "0px" }}>
                              <div className='choose_file' onClick={() => handleDocClick(index)}>
                                Choose File
                                <input ref={docInputRef} type="file"
                                  onChange={(e) => handleAttachmentFileChange(index, 'attachmentDocument', e.target.files[0])}
                                  style={{ display: "none" }} />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Form.Group>

                      {attachmentDataPreview && attachmentDataPreview[index]?.[`attachment${index + 1}Document`] ?
                        <p className='preview_img_file'>
                          <a target='_blank' href={attachmentDataPreview[index]?.[`attachment${index + 1}Preview`]}>
                            {attachmentDataPreview[index]?.[`attachment${index + 1}Document`]} </a> </p> : null}
                    </Col>
                  ))}
                <Col md={12}>
                  <div className='next_btn'>
                    <button onClick={previewHandler} disabled={loading}> Next </button>
                    <button>Back</button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        }
        {/* {
          tab === 'preview' && <div className='preview_show' style={{ transition: "all 0.3s ease" }}>
            {
              loading || saveLoading ? <Loader color={"#fff"} /> : previewPdf?.length > 0 ?
                <div className='preview_show_data'>
                  <MdClose onClick={() => setTab('registration')} className='close_icon' />

                  <Document file={previewPdf} onLoadSuccess={onDocumentLoadSuccess} loading={<Loader color={"#fff"} />}>
                    <Page pageNumber={pageNumber} />
                  </Document>

                  <div className='pdf_chevron'>
                    <FaChevronLeft onClick={pageDecrease} />
                    <FaChevronRight onClick={pageIncrease} />
                  </div>

                  <div className='preview_btn mt-2'>
                    <button onClick={saveFormHandler} disabled={saveLoading}> {saveLoading ? <Spinner animation='border' size='sm' /> : "Save"} </button>
                    <button className='discard' onClick={() => setTab('registration')}>Discard</button>
                  </div>
                </div> : null
            }
          </div>
        } */}
        {
          tab === 'submit' && <div className='registration_form'>
            <div style={{ padding: "20px" }}>
              <div className='success_msg'>
                <h3>SUCCESS</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 149 149" fill="none">
                  <mask id="mask0_346_464" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="149" height="149">
                    <rect width="149" height="149" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_346_464)">
                    <path d="M65.8082 103.058L109.577 59.2896L100.885 50.5979L65.8082 85.675L48.1144 67.9813L39.4228 76.6729L65.8082 103.058ZM74.4998 136.583C65.9116 136.583 57.8408 134.954 50.2873 131.694C42.7339 128.435 36.1634 124.011 30.5759 118.424C24.9884 112.836 20.5649 106.266 17.3056 98.7125C14.0462 91.159 12.4165 83.0882 12.4165 74.5C12.4165 65.9118 14.0462 57.841 17.3056 50.2875C20.5649 42.734 24.9884 36.1635 30.5759 30.576C36.1634 24.9885 42.7339 20.5651 50.2873 17.3057C57.8408 14.0464 65.9116 12.4167 74.4998 12.4167C83.088 12.4167 91.1589 14.0464 98.7123 17.3057C106.266 20.5651 112.836 24.9885 118.424 30.576C124.011 36.1635 128.435 42.734 131.694 50.2875C134.953 57.841 136.583 65.9118 136.583 74.5C136.583 83.0882 134.953 91.159 131.694 98.7125C128.435 106.266 124.011 112.836 118.424 118.424C112.836 124.011 106.266 128.435 98.7123 131.694C91.1589 134.954 83.088 136.583 74.4998 136.583Z" fill="#4D916F" />
                  </g>
                </svg>
                <h5>Your Form has been submitted <br /> Successfully!</h5>
                {/* {showPrintOnce === false && (
                  <button
                    className='print_doc'
                    type="button"
                    onClick={printHandler}
                    disabled={printLoader}
                  >
                    {printLoader ? <Spinner animation='border' size='sm' /> : "PRINT ORIGINAL DOCUMENT"}
                  </button>
                )} */}
              </div>

              <div className='success_btn'>
                {
                  currentUser?.access === 'masterAdmin' ?
                    <button onClick={() => navigate('/dashboard')}>Go To Dashboard</button> :
                    <button onClick={removeHandler}>Fill again</button>
                }
                <button className='discard' onClick={removeHandler}>Back</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
export default RegistrationForm