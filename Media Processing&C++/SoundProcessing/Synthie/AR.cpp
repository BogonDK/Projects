#include "pch.h"
#include "AR.h"

CAR::CAR()
{
	m_duration = 0.1;
	m_attack = 0.05;
	m_release = 0.05;
}


CAR::~CAR()
{
}

void CAR::Start()
{
	m_source->SetSampleRate(GetSampleRate());
	m_source->Start();
	m_time = 0;
}

