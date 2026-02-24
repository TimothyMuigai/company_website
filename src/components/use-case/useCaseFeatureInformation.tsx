"use client";
import React, { ReactNode } from 'react'

interface Feature {
    title: string
    description: string
    subtitle?: string
}

interface FeatureProps extends Feature {
    children?: ReactNode
}

function Feature({ title, description, subtitle, children }: FeatureProps) {
    return (
        <div className="text-center mb-16 last:mb-0">
            <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">{title}</h2>
            {subtitle && (
                <h3 className="font-light text-gray-800 mb-2">{subtitle}</h3>
            )}
            <p className="max-w-3xl mx-auto text-lg text-gray-700 ">
                {description}
            </p>
            {children}
        </div>
    )
}

interface FeatureInformationProps extends Feature {
    features: Feature[]
}


const UseCaseFeatureInformation = (
    {
        features
    } : FeatureInformationProps
) => {
  return (
      <section className="text-gray-900 max-w-7xl mx-auto mt-4 pt-20 pb-20 p-4">
          <div className="container mx-auto">
              {features.map((feature, index) => (
                  <Feature
                      key={index}
                      title={feature.title}
                      description={feature.description}
                      subtitle={feature.subtitle}
                  />
              ))}
          </div>
        </section>
  )
}

export default UseCaseFeatureInformation;