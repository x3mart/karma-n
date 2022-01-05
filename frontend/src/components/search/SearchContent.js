import React from 'react';
import Search from '../Search'

const SearchContent = () => {
    return (
      <Fragment>
        <div className='panel'>
          <div className='bio-graph-heading'>Поиск</div>
          <div className='panel-body bio-graph-info'>
            <Search />
          </div>
        </div>
      </Fragment>
    )
}

export default SearchContent;
