import {
  describe, expect, jest, test
} from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper'

describe('#FileHelper', () => {

  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 134,
        mode: 33279,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 16607023626850740,
        size: 149990,
        blocks: 296,
        atimeMs: 1630968865621.9033,
        mtimeMs: 1630968865621.9033,
        ctimeMs: 1630968865621.9033,
        birthtimeMs: 0,
        atime: '2021-09-06T22:54:25.622Z',
        mtime: '2021-09-06T22:54:25.622Z',
        ctime: '2021-09-06T22:54:25.622Z',
        birthtime: '1970-01-01T00:00:00.000Z'
      }
      const mockuser = 'daniel'
      process.env.USER = mockuser
      const filename = 'file.png'
      
      jest.spyOn(fs.promises, fs.promises.readdir.name)
          .mockResolvedValue([filename])

      jest.spyOn(fs.promises, fs.promises.stat.name)
          .mockResolvedValue(statMock)

      const result = await FileHelper.getFilesStatus('/tmp-test-unit')

      const expectedResult = [{
        size: '150 kB',
        lastModified: statMock.birthtime,
        owner: mockuser,
        file: filename
      }]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp-test-unit/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})