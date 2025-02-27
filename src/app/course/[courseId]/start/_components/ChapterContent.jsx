import React from "react";
import ReactMarkdown from "react-markdown";

function ChapterContent({ chapter, content }) {
  return (
    <div className="p-10 m-4">
      <h2 className="font-medium text-2xl">{chapter?.chapterName}</h2>
      <p className="text-gray-500">{chapter?.about}</p>

      {/* Youtube Video */}

      {content?.videoId && (
        <div className="flex justify-center my-6">
          <iframe
            width="640"
            height="390"
            src={`https://www.youtube.com/embed/${content?.videoId || content?.playlistId}`}
            title="Course video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Render Sections */}
      <div>
        {content?.content?.sections?.map((section, index) => (
          <div key={index} className="p-5 bg-blue-50 mb-3 rounded-lg">
            <h2 className="font-medium text-lg">{section.title}</h2>
            <ReactMarkdown>{section.explanation}</ReactMarkdown>

            {/* Render SubSections */}
            {section.subSections?.map((subSection, subIndex) => (
              <div key={subIndex} className="mt-4">
                <h3 className="font-medium text-md">{subSection.title}</h3>
                <ReactMarkdown>{subSection.explanation}</ReactMarkdown>

                {/* Render Features */}
                {subSection.features?.map((feature, featureIndex) => (
                  <div key={featureIndex} className="ml-4">
                    <ReactMarkdown>{feature}</ReactMarkdown>
                  </div>
                ))}

                {/* Render Code Example */}
                {subSection.codeExample && (
                  <div className="mt-4">
                    <h4 className="font-medium text-sm">
                      {subSection.codeExample.title}
                    </h4>
                    <pre className="bg-gray-100 p-3 rounded">
                      <code>{subSection.codeExample.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}

            {/* Render Reasons */}
            {section.reasons?.map((reason, reasonIndex) => (
              <div key={reasonIndex} className="ml-4">
                <ReactMarkdown>{reason}</ReactMarkdown>
              </div>
            ))}

            {/* Render Steps */}
            {section.steps?.map((step, stepIndex) => (
              <div key={stepIndex} className="ml-4">
                <ReactMarkdown>{step}</ReactMarkdown>
              </div>
            ))}

            {/* Render Code Example */}
            {section.codeExample && (
              <div className="mt-4">
                <h4 className="font-medium text-sm">
                  {section.codeExample.title}
                </h4>
                <pre className="bg-black text-white p-3 rounded-md mt-3">
                  <code>{section.codeExample.code}</code>
                </pre>
              </div>
            )}
            {/* Render Differences */}
            {section.subSection?.differences?.map((difference, diffIndex) => (
              <div key={diffIndex} className="ml-4">
                <p>{difference}</p>
              </div>
            ))}
            {/* Render Supplies */}
            {section.supplies?.map((supply, supplyIndex) => (
              <div key={supplyIndex} className="mt-4">
                <h4 className="font-medium text-sm">{supply.name}</h4>
                <p>{supply.description}</p>
                <p className="text-sm text-gray-600">
                  <strong>Tip:</strong> {supply.tip}
                </p>
              </div>
            ))}

            {/* Render Yarn Holding */}
            {section.yarnHolding && (
              <div className="mt-4">
                <h4 className="font-medium text-sm">Holding the Yarn</h4>
                <p>{section.yarnHolding}</p>
              </div>
            )}
            {/* Render Tension Tips */}
            {section.tensionTips?.map((tip, tipIndex) => (
              <div key={tipIndex} className="ml-4">
                <p>{tip}</p>
              </div>
            ))}

            {/* Render Tips */}
            {section.tips?.map((tip, tipIndex) => (
              <div key={tipIndex} className='ml-4'>
                <ReactMarkdown>{tip}</ReactMarkdown>
              </div>
            ))}

            {/* Render Stitches */}
            {section.stitches?.map((stitch, stitchIndex) => (
              <div key={stitchIndex} className="mt-4">
                <h4 className="font-medium text-sm">{stitch.title}</h4>
                <p>{stitch.explanation}</p>
                <ul className="ml-4">
                  {stitch.steps?.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
