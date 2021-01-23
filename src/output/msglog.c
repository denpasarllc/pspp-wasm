/* PSPP - a program for statistical analysis.
   Copyright (C) 2010 Free Software Foundation, Inc.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>. */

#include <config.h>

#include "output/msglog.h"

#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include "data/file-name.h"
#include "data/file-handle-def.h"
#include "data/settings.h"
#include "libpspp/cast.h"
#include "libpspp/message.h"
#include "output/driver-provider.h"
#include "output/message-item.h"

#include "gl/fwriteerror.h"
#include "gl/xalloc.h"

#include "gettext.h"
#define _(msgid) gettext (msgid)

struct msglog_driver
  {
    struct output_driver driver;
    FILE *file;
    struct file_handle *handle;
  };

static const struct output_driver_class msglog_class;

static struct msglog_driver *
msglog_driver_cast (struct output_driver *driver)
{
  assert (driver->class == &msglog_class);
  return UP_CAST (driver, struct msglog_driver, driver);
}

struct output_driver *
msglog_create (const char *file_name)
{
  enum settings_output_devices type;
  struct msglog_driver *ml;
  FILE *file;

  struct file_handle *handle = fh_create_file  (NULL, file_name, NULL, fh_default_properties ());

  file = fn_open (handle, "w");
  if (file == NULL)
    {
      msg_error (errno, _("error opening output file `%s'"), file_name);
      return NULL;
    }

  type = (!strcmp (file_name, "-") || isatty (fileno (file))
          ? SETTINGS_DEVICE_TERMINAL
          : SETTINGS_DEVICE_UNFILTERED);

  ml = xzalloc (sizeof *ml);
  ml->handle = handle;
  output_driver_init (&ml->driver, &msglog_class, file_name, type);
  ml->file = file;

  output_driver_register (&ml->driver);

  return &ml->driver;
}

static void
msglog_destroy (struct output_driver *driver)
{
  struct msglog_driver *ml = msglog_driver_cast (driver);

  fn_close (ml->handle, ml->file);
  fh_unref (ml->handle);
  free (ml);
}

static void
msglog_submit (struct output_driver *driver, const struct output_item *item)
{
  struct msglog_driver *ml = msglog_driver_cast (driver);

  if (is_message_item (item))
    {
      const struct message_item *message_item = to_message_item (item);
      char *s = msg_to_string (message_item_get_msg (message_item));
      fprintf (ml->file, "%s\n", s);
      free (s);
    }
}

static const struct output_driver_class msglog_class =
  {
    "msglog",
    msglog_destroy,
    msglog_submit,
    NULL
  };
