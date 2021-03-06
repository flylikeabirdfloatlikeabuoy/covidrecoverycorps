import React from 'react'



type AboutProps = {
  reason?: string
}

export const About: React.FunctionComponent<AboutProps> = ({}: AboutProps) => {
  return (

      <div className="About">
     


     <div>
        <h1> A citizen-powered movement to fuel COVID-19 discoveries. </h1>
        <div className="Intro__content1">
          {' '}
          <p>
            If you live in the New York Tri-State area and have recovered from
            COVID-19 — or think you have— you can help scientists make progress
            in the global fight against this disease.{' '}
          </p>
        </div>
        <h1>Why Participate? </h1>
        <div className="Intro__content2">
          <p>
            {' '}
            There is an urgent need to come together as a community to rapidly
            advance our understanding of COVID-19. By sharing your experience in
            recovering from COVID-19, you can help scientists answer critical
            questions such as: Why do some people experience very mild symptoms
            while others get very sick? How does the body fight this virus? What
            levels of antibodies are needed to protect us from reinfection and
            how long might any immunity last? How does recovering from COVID-19
            impact your health over time?{' '}
          </p>
          <p>
            Your participation may also help save lives. Participants who
            undergo serological testing and test positive for antibodies can
            choose to donate plasma and help those still fighting for survival
            from COVID-19.
          </p>
        </div>

        <h1> How it works </h1>
        <div className="Intro__content3">
          <p>
            {' '}
            There is an urgent need to come together as a community to rapidly
            advance our understanding of COVID-19. By sharing your experience in
            recovering from COVID-19, you can help scientists answer critical
            questions such as: Why do some people experience very mild symptoms
            while others get very sick? How does the body fight this virus? What
            levels of antibodies are needed to protect us from reinfection and
            how long might any immunity last? How does recovering from COVID-19
            impact your health over time?{' '}
          </p>
        </div>
      </div>









      <div className="About__content1">
        <p>
          The COVID Recovery Corps is a citizen-powered research study to learn
          more about COVID-19 and make progress in the global fight. The study
          aims to enable recovered individuals to help scientists answer key
          questions yet to be fully resolved -- from how the body fights the
          disease and how it may or may not be similar to other treatable
          diseases, to whether infection affords any level of immunity. Starting
          in the New York metropolitan area - the epicenter of the pandemic in
          the United States - participants will be the cornerstone of a powerful
          dataset that may lead to scientific breakthroughs and save lives.
        </p>
      </div>
      <h1>How the study works</h1>
      <div className="About__content2">
        <p>Step 1: Eligibility and consent</p>
        <p>
          Once you confirm your eligibility, we will ask you to review and sign
          the informed consent. The consent will explain what will happen in the
          study, as well as risks and benefits. You can also choose whether or
          not to give researchers permission to access your medical records and
          use this information for the study.
        </p>
      </div>

      <div className="About__content3">
        <p>Step 2: Take the survey</p>
        <p>Text goes here</p>
      </div>

      <div className="About__content4">
        <p>Step 3: Share your samples..</p>
        <p>
          In the first phase of the study, we will ask participants who have
          completed the survey to visit clinical sites in New York City to
          donate a blood sample for research. In the next phase of the study, we
          hope to send saliva and/or finger stick sample collection kits to
          participants’ homes to detect antibodies to COVID-19, suggesting that
          they were infected with COVID-19 in the past.
        </p>
      </div>
      <div className="About__content5">
        <p>Step 4: Learn with us along the way.</p>
        <p>
          Your ongoing participation will create a powerful dataset that may
          lead to a scientific breakthrough in COVID-19. We will return results
          of the antibody test to you and share information about what those
          results mean as we learn together. We plan to share summaries of what
          we find out from the study as we learn
        </p>
      </div>

      <div className="About__content6">
        <p>
          You choose how your data is used and shared.
        </p>
        <p>
          By default, your data will be shared only with researchers in the
          study. You can decide if you want to share your data with other
          qualified researchers outside of the study. Optional HIPAA
          authorization Access to the study database will be controlled. This
          means that other researchers may request to use de-identified study
          data (no names or other identifying information shared) for their
          research projects, but those researchers must first be approved by the
          COVID Recovery Corps study team.
        </p>
      </div>
    
    </div>
  )
}

export default About
 