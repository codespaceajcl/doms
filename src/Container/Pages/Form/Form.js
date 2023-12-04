import React, { useRef, useState } from 'react'
import { Col, Row, Form, Spinner } from 'react-bootstrap';
import { MdClose } from "react-icons/md";
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { errorNotify } from '../../../Utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { FormCreate } from '../../../Redux/Action/Dashboard';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [tab, setTab] = useState('registration');
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { loading, formCreateData } = useSelector((state) => state.postForm)

  console.log(formCreateData)

  const [formField, setFormField] = useState({
    referenceNo: "CDA/DLR/(1022)I-12/1/115",
    serialNo: "0431",
    date: '2011-01-01',
    fullName: "",
    fatherName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    cdaSerialNo: "",
    videOrderDate: "2011-01-01",
    plot: "",
    street: "",
    sector: "",
    plotSize: ""
  })

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

  const formFieldHandler = (e) => {
    const { name, value } = e.target;

    setFormField((prevFormFields) => ({
      ...prevFormFields,
      [name]: value,
    }));
  };

  const previewHandler = () => {

    const isAnyFieldEmpty = Object.values(formField).some(value => value === "");
    if (isAnyFieldEmpty || !profileImage) {
      errorNotify("Please Filled up all fields");
      return;
    }

    const registerData = new FormData();

    for (const key in formField) {
      if (formField.hasOwnProperty(key)) {
        registerData.append(key, formField[key]);
      }
    }
    registerData.append("profile", profileImage)
    registerData.append("token", currentUser.token)
    registerData.append("email", currentUser.email)

    dispatch(FormCreate(registerData))

    // setTab('preview')
  }

  return (
    <div className='form_main'>
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

      <button onClick={() => setTab("preview")}>open preview</button>

      <div className='tab_show'>
        {
          (tab === 'registration' || tab === 'preview') &&
          <div className='registration_form'>

            <div className='heading'>
              <h5>REGISTRATION</h5>

              <div>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_328_2934" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_328_2934)">
                      <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H11V6H4V18ZM13 18H20V6H13V18ZM5 16H10V14H5V16ZM5 13H10V11H5V13ZM5 10H10V8H5V10ZM14 16H19V14H14V16ZM14 13H19V11H14V13ZM14 10H19V8H14V10Z" fill="url(#paint0_linear_328_2934)" />
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_328_2934" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#739B21" />
                        <stop offset="1" stop-color="#739B21" />
                      </linearGradient>
                    </defs>
                  </svg>
                  Read Instruction</button>
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
              </div>
            </div>

            <div className='content'>
              <Row>
                <Col md={12}>
                  <p>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0_328_2959" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_328_2959)">
                        <path d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z" fill="#0094FF" />
                      </g>
                    </svg>
                    Ref# No. CDA/DLR/(1022)I-12/1/110
                  </p>
                </Col>
              </Row>
              <Row className='align-items-end'>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Serial No</Form.Label>
                    <Form.Control type="text" placeholder="Enter Serial No" disabled value={'0431'} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="text" placeholder="Enter Date" disabled value={'8-Dec-2014'} />
                  </Form.Group>
                </Col>
                <Col md={4}>
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
                      <img src={profileImagePreview ? profileImagePreview : '/images/default_image.png'} alt='' />
                    </div>
                  </div>
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
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your City"
                      name="city" value={formField.city} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State/Province</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your State/Province"
                      name="state" value={formField.state} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Country"
                      name="country" value={formField.country} onChange={formFieldHandler} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Serial No</Form.Label>
                    <Form.Control type="text" placeholder="Enter Serial No"
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
                <Col md={12}>
                  <div className='next_btn'>
                    <button onClick={previewHandler}> {loading ? <Spinner animation='border' size='sm' /> : 'Next'} </button>
                    <button>Back</button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        }
        {
          tab === 'preview' && <div className='preview_show' style={{ transition: "all 0.3s ease" }}>
            <div className='preview_show_data'>
              <MdClose onClick={() => setTab('registration')} />

              {/* <img src='/images/preview_img.png' alt='' /> */}
              <Document file="https://crms.ajcl.net/doms/directorateOfLandAndRehabilitationPreviews/yj1Nmd00XLVPHmsi.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <div className='preview_btn'>
                <button onClick={() => setTab('submit')}>Save</button>
                <button className='discard' onClick={() => setTab('registration')}>Discard</button>
              </div>
            </div>
          </div>
        }
        {
          tab === 'submit' && <div className='registration_form'>

            <div className='heading'>
              <h5>REGISTRATION</h5>
            </div>

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
              </div>

              <div className='success_btn'>
                <button onClick={() => navigate('/dashboard')}>Go To Dashboard</button>
                <button className='discard' onClick={() => setTab('registration')}>Back</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default RegistrationForm
