# AdminUI

- Building an interface for admins to see and delete users.
- Column titles must stand out from the entries.
- There should be a search bar that can filter on any property.
- Should be able to edit or delete rows in place.(There is no expectation of
  persistence. Edit and delete are expected to only happen in memory.)
- Each page contains 10 rows. Buttons at the bottom allow you to jump to any
  page including special buttons for first page, previous page, next page and
  last page. Pagination must update based on search/filtering. If there are 25
  records for example that match a search query, then pagination buttons should
  only go till 3.
- Should be able to select one or more rows. A selected row is highlighted with
  a grayish background color. Multiple selected rows can be deleted at once
  using the 'Delete Selected' button at the bottom left.
- Checkbox on the top left is a shortcut to select or deselect all displayed
  rows. This should only apply to the ten rows displayed in the current page,
  and not all 50 rows.

- Debugging
- Browser Developer Tools
  - Selecting and changing HTML, CSS
  - Checking Responsiveness
- React Developer Tools
  - Inspecting Components
