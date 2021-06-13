// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import '../App.css';

/**
 * This component is used to display the required
 * terms of use statement which can be found in a
 * link in the about tab.
 */
class TermsOfUse extends React.Component {
  render() {
    return (
      <div style={{margin:"5rem"}} className="text-justify">
        <h1>Terms of Use: <br />
          Last updated: 02/01/2021 <br /><br />

Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the “Smart Check-up” Microsoft Teams application operated by Blankit INC ("us", "we", or "our"). <br />

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. <br />

By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. <br />
          <br />


Termination: <br /><br />

We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. <br />

All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability. <br />

          <br />
Links To Other Web Sites:<br /> <br />

Our Service may contain links to third-party web sites or services that are not owned or controlled by Blankit INC.<br />
       
Blankit INC has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Blankit INC shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
<br /><br />
Changes:<br /><br />

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 15 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.<br /><br />

Contact Us:<br />
          <br />
If you have any questions about these Terms, please contact us.<br />
        </h1>
      </div>
    );
  }
}

export default TermsOfUse;