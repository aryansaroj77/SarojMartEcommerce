import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Contact = () => {
  const { isAuthenticated, user } = useAuth0();

  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (
    <Wrapper>
      <h2 className="common-heading">Contact page</h2>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3778.4382091940743!2d73.64262787489098!3d18.733953482401418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ae0855555555%3A0xbb3a80da65144c91!2spalazzo%20greens!5e0!3m2!1sen!2sin!4v1701781874184!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>

  
      <div className="container">
        <div className="contact-form">
        <form action="https://formspree.io/f/xyyqqgen" method="POST" className="contact-inputs">
                 <input type="text"  placeholder="username" name="username" required autoComplete="off" /> 
                 <input type="email"  placeholder="Enter Email" name="Email" required autoComplete="off"/> 
                  <textarea name="message" placeholder="Enter your message" cols="30" rows= "10" required autoComplete="off" ></textarea>
                  <input type="submit" value="send" />
            </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
