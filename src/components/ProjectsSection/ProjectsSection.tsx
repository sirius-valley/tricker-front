import ProjectDetails from '@components/ProjectDetails/ProjectDetails'

const ProjectsSection: React.FC = (): JSX.Element => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="max-w-[800px] w-full pt-[60px] md:px-16 px-8 self-end">
        <ProjectDetails
          id={'asdsdasd'}
          url={'example.com'}
          name={'Bonterms'}
          lastSync={new Date()}
          provider={''}
          isProjectManager={true}
        />
      </div>
    </div>
  )
}

export default ProjectsSection
